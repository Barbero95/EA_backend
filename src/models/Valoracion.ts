import {model, Schema} from "mongoose";

const ValoracionSchema: Schema = new Schema({

    createdAt: Date,
    updateAt: Date,
    titulo:{
        type: String
    },
    tituloActividad:{
        type: String
    },
    descripcion:{
        type: String
    },
    propietario:{
        type: String
    },
    estrella:{
        type: Number
    }
}
);

export default model('Valoracion', ValoracionSchema);