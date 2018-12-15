"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificacionSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    dueñoActividad: {
        type: String
    },
    participanteActividad: {
        type: String
    },
    tituloActividad: {
        type: String
    },
    flag: {
        type: Number
    }
});
exports.default = mongoose_1.model('Notificacion', NotificacionSchema);
//# sourceMappingURL=Notificacion.js.map