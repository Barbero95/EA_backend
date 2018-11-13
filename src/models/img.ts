/*const mongoose = require('mongoose');
 
const ImageSchema = mongoose.Schema({
    type: String,
    data: Buffer
});
 
module.exports = mongoose.model('Image', ImageSchema);
*/
import {Schema, model, Mongoose} from 'mongoose';
import { ObjectId } from 'bson';
const ImgSchema: Schema = new Schema({
    
    createdAt: Date, 
    updateAt: Date,
    
    avatar:{
        type: String
    },
    id: {
        type:Object
    }
});

export default model('Img', ImgSchema);