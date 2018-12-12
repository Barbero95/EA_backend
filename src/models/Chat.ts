import {Schema, model, Mongoose} from 'mongoose';
import User from "./User";
import Message from "./Message";

const ChatSchema: Schema = new Schema({
  room: {
    type: String
  },
  users: [{
    type: Object
  }],
  created: Date,
  messages: [{
    type: Object
  }],
  lastMessage: {
    type: String
  },
  lastMessageDate: Date
});

export default model('Chat', ChatSchema);
