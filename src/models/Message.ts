import {Schema, model, Mongoose} from 'mongoose';

const MessageSchema: Schema = new Schema({
  room: {
    type: String
  },
  message: {
    type: String
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  created: Date,
  seen: {
    type: Boolean
  }
});

export default model('Message', MessageSchema);
