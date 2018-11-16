"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DenunciaSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    resumen: {
        type: String
    },
    explicacion: {
        type: String
    },
    denunciante: {
        type: String
    },
    denunciado: {
        type: String
    },
    idActividadDenunciada: {
        type: String
    }
});
DenunciaSchema.index({ location: "2dsphere" });
exports.default = mongoose_1.model('Denuncia', DenunciaSchema);
//# sourceMappingURL=Denuncia.js.map