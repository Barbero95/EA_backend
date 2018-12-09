import {Schema, model, Mongoose} from 'mongoose';

const NotificacionSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date, 
    dueñoActividad:{
        type: String
    },
    participanteActividad:{
        type: String
    },
    flag:{
        type: Number
    }

});

export default model('Notificacione', NotificacionSchema);
