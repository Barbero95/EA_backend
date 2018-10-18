"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ActividadSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    titulo: {
        type: String
        //required: true,
        //path: 'titulo'
    },
    descripcion: {
        type: String
        //required: true,
        //path: 'descripcion'
    },
    //estrellas de la Actividad
    estrellas: [{
            type: Number,
        }],
    //ponemos aqui los tags a los que pertenece la actividad?
    tags: [{
            type: String,
        }],
    propietario: {
        type: String,
    },
    clientes: [{
            nick: String,
            estado: String
        }]
});
exports.default = mongoose_1.model('Actividad', ActividadSchema);
//# sourceMappingURL=Actividad.js.map