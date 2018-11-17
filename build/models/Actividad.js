"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Point } = require('mongoose-geojson-schemas');
const ActividadSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    //estrellas de la Actividad
    estrellas: {
        type: Number
    },
    //ponemos aqui los tags a los que pertenece la actividad?
    tags: [{
            type: String
        }],
    propietario: {
        type: String
    },
    clientes: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'User',
            estado: Number
        }],
    ubicacion: {
        type: String
    },
    /*
    location: {
        type: Point,
        coordinates: [{type: Number}]
    }
    
    geo:{
        lat: {type: Number},
        lng: {type: Number}
    }
    loc: {
        type: {type:String},
        coordinates: []
    }
    */
    //[Long,Lat]
    localizacion: [{
            type: Number
        }]
});
//ActividadSchema.index({ loc: "2dsphere" });
exports.default = mongoose_1.model('Actividade', ActividadSchema);
//# sourceMappingURL=Actividad.js.map