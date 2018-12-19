import {Schema, model, Mongoose} from 'mongoose';

const NotificacionSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date, 
    dueñoActividad:{
        type: String
    },
    participanteActividad:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    tituloActividad:{
        type: Schema.Types.ObjectId, ref: 'Actividade'
    },
    flag:{
        type: Number
    }

});

export default model('Notificacion', NotificacionSchema);
