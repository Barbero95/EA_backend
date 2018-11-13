import {Schema, model, Mongoose} from 'mongoose';

const ActividadSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date,
    titulo:{
        type: String
    },
    descripcion:{
        type: String 
    },
    //estrellas de la Actividad
    estrellas:{
        type: Number , default: 0
    },
    fecha:{
        type: Date, default: Date.now
    },
    horas:{
        type: Number
    },
    //ponemos aqui los tags a los que pertenece la actividad?
    tags:[{
        type: String 
    }],
    propietario:{
        type: String
    },
    clientes:[{
        type: Schema.Types.ObjectId, ref: 'User',
        estado: String
    }]
});


export default model('Actividade', ActividadSchema);