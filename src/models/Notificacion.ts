import {Schema, model, Mongoose} from 'mongoose';

const NotificacionSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date, 
    dueñoActividad:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    participanteActividad:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    flag:{
        type: Number
    }

});

export default model('Notificacion', NotificacionSchema);
