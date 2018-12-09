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
    flag: {
        type: Number
    }
});
exports.default = mongoose_1.model('Notificacione', NotificacionSchema);
//# sourceMappingURL=Notificaciones.js.map