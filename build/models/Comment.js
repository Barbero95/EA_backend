"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    comment: {
        type: String
    },
    rating: {
        type: Number
    },
    user: {
        type: String
    }
});
exports.default = mongoose_1.model('Comment', CommentSchema);
//# sourceMappingURL=Comment.js.map