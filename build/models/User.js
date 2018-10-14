"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    nick: {
        type: String,
    },
    email: {
        type: String,
    },
    estrellas: [{
            //array
            type: Number
        }],
    password: {
        type: String,
    },
    imagen: {
        type: String,
    },
    tags: [{
            //array
            type: String
        }],
    actividadesPropietario: [{
            //array
            type: String
        }],
    actividadesCliente: [{
            //array
            type: String
        }]
});
exports.default = mongoose_1.model('User', UserSchema);
