import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import Chat from "./models/Chat";
import User from "./models/User";
import Message from "./models/Message";


export class ChatServer {
  public static readonly PORT:number = 3001;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connection', function(socket: any){
      socket.on('subscribe', async function(users) {
        let room;
        if(users.userFrom.name && users.userTo.name) {
          if (users.userFrom.name.toLowerCase() < users.userTo.name.toLowerCase()) {
            room = "" + users.userFrom._id + "" + users.userTo._id;
          } else {
            room = "" + users.userTo._id + "" + users.userFrom._id;
          }
        }

        let checkChat : any = await Chat.findOne({ room: room });

        if(checkChat) {
          checkChat.users.find(user => {
            console.log('err usuari', user);
            if(user.userId === users.userFrom._id) {
              user.lastView = Date.now();
            }
          });
          await Chat.findOneAndUpdate({ room: room }, checkChat);

          console.log('joining room', room);
          socket.join(room);
        } else {
          let newChat : any = new Chat();
          newChat.room = room;
          newChat.created = Date.now();
          newChat.users.push({
            userId: users.userFrom._id,
            userName: users.userFrom.name,
            userConnected: users.userFrom.connected,
            lastView: Date.now()
          });
          newChat.users.push({
            userId: users.userTo._id,
            userName: users.userTo.name,
            userConnected: users.userTo.connected,
            lastView: null
          });
          await newChat.save();
          console.log('joining room', room);
          socket.join(room);
        }
      });
      socket.on('disconnect', async function (username) {
        await User.findOneAndUpdate({name: username}, {connected: false}, {new: true});
        socket.emit('user-changed', {
          user: socket.username,
          event: 'left'
        })
      });
      socket.on('set-username', async (username) => {
        socket.username = username;
        await User.findOneAndUpdate({name: username}, {connected: true}, {new: true});
        socket.emit('users-changed', {
          user: username,
          event: 'joined'
        });
      });
      socket.on('add-message', async (message) => {
        let msg = new Message(message);
        let msgSaved : any = await msg.save();
        await Chat.update({ room: message.room }, {
          $push: {
            messages: msgSaved._id
          },
        });
        await Chat.findOneAndUpdate({room: message.room}, {
          lastMessage: msgSaved.message,
          lastMessageDate: msgSaved.created
        });


        console.log('sending room post', message);
        socket.to(message.room).emit('message', msgSaved);
      });
    });

    /*this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', this.port);
      socket.on('message', (m: Message) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.io.emit('message', m);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });*/
  }

  public getApp(): express.Application {
    return this.app;
  }
}