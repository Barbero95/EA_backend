import {Request, Response, Router} from "express";
import Chat from "../models/Chat";
import Message from "../models/Message";
let ObjectId = require('mongodb').ObjectID;

class ChatRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  getChatRoom(req: Request, res: Response) {
    let users = req.body;

    let room;
    if (users.userFrom.nick && users.userTo.nick) {
      if (users.userFrom.nick.toLowerCase() < users.userTo.nick.toLowerCase()) {
        room = "" + users.userFrom._id + "" + users.userTo._id;
      } else {
        room = "" + users.userTo._id + "" + users.userFrom._id;
      }
    }
    res.status(200).send({
      room: room
    });
  }

  async getChatRoomById(req: Request, res: Response) {
    let room = req.body.room;

    let chat = await Chat.find({room: room});

    res.status(200).send(chat);
  }

  async getMessages(req: Request, res: Response) {
    let body = req.body;
    let msgs: any = await Chat.findOne({ room: body.room }, { messages: 1 });

    let messages = [];

    if(msgs && msgs.messages) {
      for(let i = 0 ; i < msgs.messages.length; i++){
        let message = await Message.findOne({ _id: msgs.messages[i] });
        messages.push(message);
        if(i === msgs.messages.length -1) {
          res.status(200).send({messages: messages});
        }
      }
    } else {
      res.status(200).send({messages: messages});
    }
  }

  async lastView(req: Request, res: Response) {
    let body = req.body;
    let update = await Chat.updateOne({room: body.room, "users.userId": ObjectId(body.user)}, {
      $set: {
        "users.$.lastView": body.lastView
      }
    });

    await Message.updateMany({room: body.room, to: body.user, seen: false}, {seen: true});

    res.status(200).send({okey: 'ok'});
  }

  async getChats(req: Request, res: Response) {
    let user = req.body;

    let chats = await Chat.find({ users: {
        $elemMatch: {
          userId: user._id
        }
      }
    }).sort({ created: -1});
    res.status(200).send(chats);
  }

  async createChat(req: Request, res: Response) {
    let users : any = req.body;

    let room;
    if (users.userFrom.name.toLowerCase() < users.userTo.name.toLowerCase()) {
      room = "" + users.userFrom._id + "" + users.userTo._id;
    } else {
      room = "" + users.userTo._id + "" + users.userFrom._id;
    }
    let checkChat = await Chat.findOne({room: room});

    if(checkChat) {
      res.status(200).send(checkChat);
    } else {
      let newChat : any = new Chat();
      let from = {
        userId: users.userFrom._id,
        userName: users.userFrom.name,
        userConnected: users.userFrom.connected,
        lastView: Date.now()
      };
      let to = {
        userId: users.userTo._id,
        userName: users.userTo.name,
        userConnected: users.userTo.connected,
        lastView: null
      };
      newChat.users.push(from);
      newChat.users.push(to);
      newChat.created = Date.now();
      newChat.room = room;
      let savedChat = await newChat.save();
      res.status(200).send(savedChat);
    }
  }

  async getMessagesNotSeen(req: Request, res: Response) {
    let user : any = req.body;

    let messages = await Message.find({to: user._id, seen: false});
    res.status(200).send({number: messages.length});
  }


  //@ts-ignore
  routes(){
    //@ts-ignore

    this.router.post('/getRoom', this.getChatRoom);
    this.router.post('/getRoomById', this.getChatRoomById);
    this.router.post('/getMessages', this.getMessages);
    this.router.post('/messagesNotSeen', this.getMessagesNotSeen);
    this.router.post('/lastView', this.lastView);
    this.router.post('/getChats', this.getChats);
    this.router.post('/newChat', this.createChat);
  }
}


//export
//@ts-ignore
const chatRoutes = new ChatRouter();
chatRoutes.routes();

export default chatRoutes.router;