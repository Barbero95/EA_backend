"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
        type: Number, default: 0
    },
    fecha: {
        type: Date, default: Date.now
    },
    horas: {
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
            estado: String
        }]
});
exports.default = mongoose_1.model('Actividade', ActividadSchema);
//# sourceMappingURL=Actividad.js.map