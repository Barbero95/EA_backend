import {Schema, model, Mongoose} from 'mongoose';

const CommentSchema: Schema = new Schema({
  comment: {
    type: String
  },
  rating: {
    type: Number
  },
  user: {
    type: String
  }
});

export default model('Comment', CommentSchema);