"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIo = require("socket.io");
const Chat_1 = require("./models/Chat");
const User_1 = require("./models/User");
const Message_1 = require("./models/Message");
class ChatServer {
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        this.app = express();
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.port = process.env.PORT || ChatServer.PORT;
    }
    sockets() {
        this.io = socketIo(this.server);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connection', function (socket) {
            socket.on('subscribe', function (users) {
                return __awaiter(this, void 0, void 0, function* () {
                    let room;
                    if (users.userFrom.name && users.userTo.name) {
                        if (users.userFrom.name.toLowerCase() < users.userTo.name.toLowerCase()) {
                            room = "" + users.userFrom._id + "" + users.userTo._id;
                        }
                        else {
                            room = "" + users.userTo._id + "" + users.userFrom._id;
                        }
                    }
                    let checkChat = yield Chat_1.default.findOne({ room: room });
                    if (checkChat) {
                        checkChat.users.find(user => {
                            console.log('err usuari', user);
                            if (user.userId === users.userFrom._id) {
                                user.lastView = Date.now();
                            }
                        });
                        yield Chat_1.default.findOneAndUpdate({ room: room }, checkChat);
                        console.log('joining room', room);
                        socket.join(room);
                    }
                    else {
                        let newChat = new Chat_1.default();
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
                        yield newChat.save();
                        console.log('joining room', room);
                        socket.join(room);
                    }
                });
            });
            socket.on('disconnect', function (username) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield User_1.default.findOneAndUpdate({ name: username }, { connected: false }, { new: true });
                    socket.emit('user-changed', {
                        user: socket.username,
                        event: 'left'
                    });
                });
            });
            socket.on('set-username', (username) => __awaiter(this, void 0, void 0, function* () {
                socket.username = username;
                yield User_1.default.findOneAndUpdate({ name: username }, { connected: true }, { new: true });
                socket.emit('users-changed', {
                    user: username,
                    event: 'joined'
                });
            }));
            socket.on('add-message', (message) => __awaiter(this, void 0, void 0, function* () {
                let msg = new Message_1.default(message);
                let msgSaved = yield msg.save();
                yield Chat_1.default.update({ room: message.room }, {
                    $push: {
                        messages: msgSaved._id
                    },
                });
                yield Chat_1.default.findOneAndUpdate({ room: message.room }, {
                    lastMessage: msgSaved.message,
                    lastMessageDate: msgSaved.created
                });
                console.log('sending room post', message);
                socket.to(message.room).emit('message', msgSaved);
            }));
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
    getApp() {
        return this.app;
    }
}
ChatServer.PORT = 3001;
exports.ChatServer = ChatServer;
//# sourceMappingURL=chat-server.js.map