"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    title: {
        type: String,
        default: '',
        required: true
    },
    slug: {
        //url.com/posts/firtscosa
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        default: '',
        required: true
    },
    featuredImage: {
        type: String,
        default: ''
    }
});
exports.default = mongoose_1.model('Post', PostSchema);
