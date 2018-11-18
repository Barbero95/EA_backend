import {Schema, model, Mongoose} from 'mongoose';


const LocalizacionSchema: Schema = new Schema({


    createdAt: Date,
    updateAt: Date,
    longitude:{
        type: Number
    },
    latitude:{
        type: Number
    }
});

export default model('Localizacion', LocalizacionSchema);