"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ValoracionSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    titulo: {
        type: String
    },
    idAct: {
        type: String
    },
    descripcion: {
        type: String
    },
    propietario: {
        type: String
    },
    estrellas: {
        type: Number
    }
});
exports.default = mongoose_1.model('Valoracion', ValoracionSchema);
//# sourceMappingURL=Valoracion.js.map