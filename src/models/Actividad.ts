import {Schema, model, Mongoose} from 'mongoose';

const ActividadSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date,
    titulo:{
        type: String
        //required: true,
        //path: 'titulo'
    },
    descripcion:{
        type: String 
        //required: true,
        //path: 'descripcion'
    },
    //estrellas de la Actividad
    estrellas:[{
        type: Number, 
        //path: 'estrellas'
    }],
    //ponemos aqui los tags a los que pertenece la actividad?
    tags:[{
        type: String, 
        //default: '',
        //path: 'tags'
    }],
    propietario:{
        type: String,
        //default: '',
        //path: 'propietario'
    },
    clientes:[{
        type: Schema.Types.ObjectId, ref: 'User',
        estado: String
    }]
});

export default model('Actividad', ActividadSchema);