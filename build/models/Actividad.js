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
    rooms: [{
            type: String
        }],
    clientes: [{
            //idCliente: {type: Schema.Types.ObjectId, ref: 'User'},
            idCliente: String,
            estado: Number
        }],
    horasActividad: {
        type: Number
    },
    contadorEstrellasActividad: {
        type: Number
    },
    valoraciones: [{
            type: String
        }],
    ubicacion: {
        type: String
    },
    //[lati, long]
    localizacion: [{
            type: Number
        }]
});
//ActividadSchema.index({ loc: "2dsphere" });
exports.default = mongoose_1.model('Actividade', ActividadSchema);
//# sourceMappingURL=Actividad.js.map