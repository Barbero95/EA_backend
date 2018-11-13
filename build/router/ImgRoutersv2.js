"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Img_1 = require("../models/Img");
class ImgRouter {
    constructor() {
        this.multer = require('multer');
        this.upload = multer({ dest: 'uploads/' });
        this.storage = multer.disk;
        this.router = express_1.Router();
        this.routes();
    }
    //ver una sola foto
    GetImgUser(req, res) {
        const id = req.params.id;
        Img_1.default.findById({ id })
            .then((data) => {
            let status = 200;
            if (data == null) {
                status = 404;
            }
            res.statusCode = status;
            res.json(data);
        })
            .catch((err) => {
            const status = 500;
            res.json(err);
        });
    }
    //añadir por primera vez la foto de un usuario
    CreateNewImg(req, res) {
        //var fs = require('fs');
        //var imageData = fs.readFileSync('imgPath');
        ///path/to/file
        /*
        const image = new Image({
            type: 'image/png',
            //data: imageData
            data:
        });
        */
        const imageperfil = req.file.path;
        const image = new Img_1.default({
            imageperfil
        });
        image.save()
            .then((data) => {
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
    }
    //modificar usuario
    UpdateImgUser(req, res) {
    }
    //@ts-ignore
    routes() {
        //@ts-ignore
        this.router.get('/:id', this.GetImgUser);
        this.router.post('/', this.CreateNewImg);
        this.router.put('/:id', this.UpdateImgUser);
    }
}
//export
//@ts-ignore
const imgRoutes = new ImgRouter();
imgRoutes.routes();
exports.default = imgRoutes.router;
//# sourceMappingURL=ImgRoutersv2.js.map