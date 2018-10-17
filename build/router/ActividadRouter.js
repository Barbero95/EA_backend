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
            const status = res.statusCode;
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
        Actividad_1.default.findOne({ titulo })
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
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
        actividad.save()
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    //modificar actividad
    ModificarActividad(req, res) {
        const id = req.params.id;
        //const titulo: string = req.params.titulo;
        //const descripcion: string = req.params.descripcion;
        //const tags: string[] = req.params.tags;
        //const propietario: string = req.params.propietario;
        Actividad_1.default.findOneAndUpdate({ id }, req.body)
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
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
        this.router.put('/modificarActividad/:id', this.ModificarActividad);
    }
}
//export
//@ts-ignore
const actividadRoutes = new ActividadRouter();
actividadRoutes.routes();
exports.default = actividadRoutes.router;
//# sourceMappingURL=ActividadRouter.js.map