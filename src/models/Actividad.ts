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
        estado: Number
    }],
    ubicacion:{
        type: String
    },
    habilitada:{
        type: Number
    },
    /*
    location:{
        tipo: {type: String},
        coordinates: [{type: Number}]
    }
    */
    location: [{type: Number}]
});

ActividadSchema.index({ location: "2dsphere" });


export default model('Actividade', ActividadSchema);