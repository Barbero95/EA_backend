"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*const mongoose = require('mongoose');
 
const ImageSchema = mongoose.Schema({
    type: String,
    data: Buffer
});
 
module.exports = mongoose.model('Image', ImageSchema);
*/
const mongoose_1 = require("mongoose");
const ImgSchema = new mongoose_1.Schema({
    createdAt: Date,
    updateAt: Date,
    avatar: {
        type: String
    },
    id: {
        type: Object
    }
});
exports.default = mongoose_1.model('Img', ImgSchema);
//# sourceMappingURL=Img.js.map