"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Actividad_1 = require("../models/Actividad");
class ActividadRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    //ver todas las actividades
    GetActividades(req, res) {
        Actividad_1.default.find({})
            .then((data) => {
            let status = 200;
            if (data == null) {
                status = 404;
            }
            res.statusCode = status;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = 404;
            res.json({
                status,
                err
            });
        });
    }
    //ver una actividad
    GetActividad(req, res) {
        //const id: number = req.params.id;
        const titulo = req.params.titulo;
        Actividad_1.default.findOne({ "titulo": titulo })
            .then((data) => {
            let status = 200;
            if (data == null) {
                status = 404;
            }
            res.statusCode = status;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = 500;
            res.json({
                status,
                err
            });
        });
    }
    //ver si esta actividad ya existe para el mismo ususario
    //miramos si hay ya una 
    ComprobarActividad(req, res) {
        const titulo = req.body.titulo;
        const propietario = req.body.propietario;
        Actividad_1.default.findOne({ "titulo": titulo, "propietario": propietario })
            .then((data) => {
            let status = 200;
            if (data == null) {
                status = 404;
            }
            res.statusCode = status;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = 500;
            res.json({
                status,
                err
            });
        });
    }
    //crear una actividad
    CrearActividad(req, res) {
        const titulo = req.body.titulo;
        const descripcion = req.body.descripcion;
        let estrellas = req.body.estrellas;
        if (estrellas == null) {
            estrellas = 0;
        }
        const tags = req.body.tags;
        const propietario = req.body.propietario;
        const actividad = new Actividad_1.default({
            titulo,
            descripcion,
            estrellas,
            tags,
            propietario
        });
        actividad.save()
            .then((data) => {
            let status = 200;
            res.statusCode = status;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = 500;
            res.json({
                status,
                err
            });
        });
    }
    //modificar actividad
    ModificarActividad(req, res) {
        const title = req.params.title;
        const titulo = req.body.titulo;
        const descripcion = req.body.descripcion;
        const estrellas = req.body.estrellas;
        const tags = req.body.tags;
        const propietario = req.body.propietario;
        const actividad = new Actividad_1.default({
            titulo,
            descripcion,
            estrellas,
            tags,
            propietario
        });
        //Actividad.findOneAndUpdate({ "_id": new ObjectID(id) }, actividad)
        Actividad_1.default.findOneAndUpdate({ "title": title }, req.body)
            .then((data) => {
            const status = 200;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = 404;
            res.json({
                status,
                err
            });
        });
    }
    //@ts-ignore
    routes() {
        //@ts-ignore
        this.router.get('/', this.GetActividades);
        this.router.get('/:titulo', this.GetActividad);
        this.router.post('/', this.CrearActividad);
        this.router.put('/:title', this.ModificarActividad);
    }
}
//export
//@ts-ignore
const actividadRoutes = new ActividadRouter();
actividadRoutes.routes();
exports.default = actividadRoutes.router;
//# sourceMappingURL=ActividadRouter.js.map