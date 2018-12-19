import {model, Schema} from "mongoose";

const ValoracionSchema: Schema = new Schema({

    createdAt: Date,
    updateAt: Date,
    titulo:{
        type: String
    },
    idAct:{
        type: String
    },
    descripcion:{
        type: String
    },
    propietario:{
        type: String
    },
    estrellas:{
        type: Number
    }
}
);

export default model('Valoracion', ValoracionSchema);