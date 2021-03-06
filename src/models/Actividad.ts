import {Schema, model, Mongoose} from 'mongoose';

const {Point} = require('mongoose-geojson-schemas');

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
    rooms: [{
      type: String
    }],
    clientes:[{
        //idCliente: {type: Schema.Types.ObjectId, ref: 'User'},
        idCliente: String,
        estado: Number
    }],
    horasActividad:{
        type: Number
    },
    contadorEstrellasActividad:{
        type: Number
    },
    valoraciones:[{
        type: String
    }],
    ubicacion:{
        type: String
    },
    //[lati, long]
    localizacion:[{
        type: Number
    }],
    imagen: {
        type: String
    }
    
});

//ActividadSchema.index({ loc: "2dsphere" });


export default model('Actividade', ActividadSchema);