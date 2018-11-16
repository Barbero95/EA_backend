"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LocalizacionSchema = new mongoose_1.Schema({
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    }
});
exports.default = mongoose_1.model('Localizacion', LocalizacionSchema);
//# sourceMappingURL=Localizacion.js.map