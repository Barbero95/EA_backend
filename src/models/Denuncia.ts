import {Schema, model, Mongoose} from 'mongoose';

const DenunciaSchema: Schema = new Schema({

    createdAt: Date, 
    updateAt: Date,
    resumen:{
        type: String
    },
    explicacion:{
        type: String 
    },
    denunciante:{
        type: String
    },
    denunciado:{
        type: String
    },
    idActividadDenunciada:{
        type: String
    }
});

DenunciaSchema.index({ location: "2dsphere" });


export default model('Denuncia', DenunciaSchema);