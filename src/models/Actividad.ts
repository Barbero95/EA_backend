import {Schema, model, Mongoose} from 'mongoose';

let PostSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date, 
    title:{
        type: String, 
        default: '', 
        required: true
    },
    slug:{
        //url.com/posts/firtscosa
        type: String, 
        default: '',
        required: true, 
        unique: true,
        lowercase: true
    },
    content: {
        type: String, 
        default: '', 
        required: true
    },
    featuredImage: {
        type: String,
        default: ''
    }
});

export default model('Post', PostSchema);
