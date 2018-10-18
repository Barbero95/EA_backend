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
    ComprobarActividad(titulo, propietario, callback) {
        //p=:promise<err,Actividad>
        //p.then(........) dentro pongo lo que quiero ejecutar
        //p.catch(......) para error
        Actividad_1.default.findOne({ "titulo": titulo, "propietario": propietario })
            .then((data) => {
            callback(null, data);
            return;
        })
            .catch((err) => {
            return callback(err, null);
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
        this.ComprobarActividad(titulo, propietario, (err, data) => {
            if (err != null) {
                //enviar codigo ya existe
                const status = 402;
                res.json({
                    status,
                    err
                });
            }
            else {
                actividad.save()
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
        Actividad_1.default.findOneAndUpdate({ "title": title }, { $set: { actividad } })
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