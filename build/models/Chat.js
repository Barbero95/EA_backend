"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    room: {
        type: String
    },
    users: [{
            type: Object
        }],
    created: Date,
    messages: [{
            type: Object
        }],
    lastMessage: {
        type: String
    },
    lastMessageDate: Date
});
exports.default = mongoose_1.model('Chat', ChatSchema);
//# sourceMappingURL=Chat.js.map