import {Schema, model, Mongoose} from 'mongoose';


const LocalizacionSchema: Schema = new Schema({

    longitude:{
        type: Number
    },
    latitude:{
        type: Number
    }
});

export default model('Localizacion', LocalizacionSchema);