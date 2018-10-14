import {Schema, model, Mongoose} from 'mongoose';

const UserSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date, 
    nombre:{
        type: String,
        //required: 'Inserta el nombre',
        //trim: true
    },
    apellido:{
        type: String,
        //required: 'Inserta el apellido',
        //trim: true
    },
    nick:{
        type: String,
        //required: 'Inserta el nick',
        //trim: true
    },
    email:{
        type: String,
        //unique:true,
        //required: 'Insertar el email',
        //trim: true,
        //lowercase:true
    },
    estrellas:[{
        //array
        type: Number
    }],
    password: {
        type: String, 
        //default: '', 
        //path: 'password',
    }, 
    imagen: {
        type: String,
        //default: ''
    },
    tags: [{
        //array
        type: String
        
    }], 
    actividadesPropietario:[{
        //array
        type: String
        
    }],
    actividadesCliente:[{
       //array
        type: String
    }]
});

export default model('User', UserSchema);
