"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    nick: {
        type: String,
        tags: { type: [String], index: true }
    },
    email: {
        type: String
    },
    estrellas: {
        type: Number
    },
    password: {
        type: String
    },
    horas: {
        type: Number
    },
    imagen: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Img'
    },
    tags: [{
            type: String
        }],
    actividadesPropietario: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Actividad'
        }],
    actividadesCliente: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Actividad'
        }]
});
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map