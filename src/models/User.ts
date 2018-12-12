import {Schema, model, Mongoose} from 'mongoose';

const UserSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date, 
    nombre:{
        type: String
    },
    apellido:{
        type: String
    },
    nick:{
        type: String
    },
    email:{
        type: String
    },
    estrellas:{
        type: Number
    },
    password: {
        type: String
    }, 
    imagen: {
        type: String
    },
    tags: [{
        type: String
        
    }], 
    notificaciones: [{
        type: String
        
    }], 
    horasUsuario:{
        type: Number
    },
    contadorEstrellasUsuario:{
        type: Number
    } ,
    actividadesPropietario:[{
        type: Schema.Types.ObjectId, ref: 'Actividad'
        
    }],
    actividadesCliente:[{
       type: Schema.Types.ObjectId, ref: 'Actividad'
    }]

});

export default model('User', UserSchema);
