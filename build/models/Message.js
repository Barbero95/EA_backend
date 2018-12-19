"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    room: {
        type: String
    },
    message: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    created: Date,
    seen: {
        type: Boolean
    }
});
exports.default = mongoose_1.model('Message', MessageSchema);
//# sourceMappingURL=Message.js.map