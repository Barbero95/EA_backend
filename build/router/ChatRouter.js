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
const express_1 = require("express");
const Chat_1 = require("../models/Chat");
const Message_1 = require("../models/Message");
let ObjectId = require('mongodb').ObjectID;
class ChatRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getChatRoom(req, res) {
        let users = req.body;
        console.log(users);
        let room;
        if (users.userFrom.name && users.userTo.name) {
            if (users.userFrom.name.toLowerCase() < users.userTo.name.toLowerCase()) {
                room = "" + users.userFrom._id + "" + users.userTo._id;
            }
            else {
                room = "" + users.userTo._id + "" + users.userFrom._id;
            }
        }
        res.status(200).send({
            room: room
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            let msgs = yield Chat_1.default.findOne({ room: body.room }, { messages: 1 });
            let messages = [];
            if (msgs && msgs.messages) {
                for (let i = 0; i < msgs.messages.length; i++) {
                    let message = yield Message_1.default.findOne({ _id: msgs.messages[i] });
                    messages.push(message);
                    if (i === msgs.messages.length - 1) {
                        res.status(200).send({ messages: messages });
                    }
                }
            }
            else {
                res.status(200).send({ messages: messages });
            }
        });
    }
    lastView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            let update = yield Chat_1.default.updateOne({ room: body.room, "users.userId": ObjectId(body.user) }, {
                $set: {
                    "users.$.lastView": body.lastView
                }
            });
            res.status(200).send({ okey: 'ok' });
        });
    }
    getChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            let chats = yield Chat_1.default.find({ users: {
                    $elemMatch: {
                        userId: user._id
                    }
                }
            }).sort({ created: -1 });
            res.status(200).send(chats);
        });
    }
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = req.body;
            let room;
            if (users.userFrom.name.toLowerCase() < users.userTo.name.toLowerCase()) {
                room = "" + users.userFrom._id + "" + users.userTo._id;
            }
            else {
                room = "" + users.userTo._id + "" + users.userFrom._id;
            }
            let checkChat = yield Chat_1.default.findOne({ room: room });
            if (checkChat) {
                res.status(200).send(checkChat);
            }
            else {
                let newChat = new Chat_1.default();
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
                let savedChat = yield newChat.save();
                res.status(200).send(savedChat);
            }
        });
    }
    //@ts-ignore
    routes() {
        //@ts-ignore
        this.router.post('/getRoom', this.getChatRoom);
        this.router.post('/getMessages', this.getMessages);
        this.router.post('/lastView', this.lastView);
        this.router.post('/getChats', this.getChats);
        this.router.post('/newChat', this.createChat);
    }
}
//export
//@ts-ignore
const chatRoutes = new ChatRouter();
chatRoutes.routes();
exports.default = chatRoutes.router;
//# sourceMappingURL=ChatRouter.js.map