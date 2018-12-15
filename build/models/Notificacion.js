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
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
    },
    tituloActividad: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Actividade'
    },
    flag: {
        type: Number
    }
});
exports.default = mongoose_1.model('Notificacion', NotificacionSchema);
//# sourceMappingURL=Notificacion.js.map