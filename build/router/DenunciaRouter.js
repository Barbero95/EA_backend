"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Denuncia_1 = require("../models/Denuncia");
class DenunciaRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    //ver todas las denuncias
    GetDenuncias(req, res) {
        Denuncia_1.default.find({})
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
    //crear una denuncia
    CrearDenuncia(req, res) {
        const resumen = req.body.resumen;
        const explicacion = req.body.explicacion;
        const denunciante = req.body.denunciante;
        const denunciado = req.body.denunciado;
        const idActividadDenunciada = req.body.idActividadDenunciada;
        const denuncia = new Denuncia_1.default({
            resumen,
            explicacion,
            denunciante,
            denunciado,
            idActividadDenunciada,
        });
        console.log(denuncia);
        denuncia.save()
            .then((data) => {
            res.statusCode = 200;
            res.json({
                data
            });
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json({
                err
            });
        });
    }
    //Borrar denuncia
    BorrarDenuncia(req, res) {
        const _id = req.params._id;
        Denuncia_1.default.findOneAndDelete({ "id": _id, })
            .then((data) => {
            const status = 200;
            res.json(data);
        })
            .catch((err) => {
            const status = 404;
            res.json(err);
        });
    }
    //@ts-ignore
    routes() {
        //@ts-ignore
        this.router.get('/', this.GetDenuncias);
        this.router.post('/', this.CrearDenuncia);
        this.router.delete('/:id', this.BorrarDenuncia);
    }
}
//export
//@ts-ignore
const denunciaRoutes = new DenunciaRouter();
denunciaRoutes.routes();
exports.default = denunciaRoutes.router;
//# sourceMappingURL=DenunciaRouter.js.map