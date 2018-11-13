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
        type: String,
        tags: { type: [String], index: true }
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
    horas:{
        type: Number
    },
    imagen: {
        type: Schema.Types.ObjectId, ref: 'Img'
    },
    tags: [{
        type: String
        
    }], 
    actividadesPropietario:[{
        type: Schema.Types.ObjectId, ref: 'Actividad'
        
    }],
    actividadesCliente:[{
       type: Schema.Types.ObjectId, ref: 'Actividad'
    }]
});

export default model('User', UserSchema);
