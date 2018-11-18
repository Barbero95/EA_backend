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
            res.json(data);
        })
            .catch((err) => {
            const status = 500;
            res.json(err);
        });
    }
    //ver actividad segun propietario
    GetActividadesPropietario(req, res) {
        const propietario = req.params.propietario;
        Actividad_1.default.find({ "propietario": propietario })
            .then((data) => {
            let status = 200;
            if (data == null) {
                status = 404;
                console.log("llegue hasta 1er control");
            }
            console.log("llegue hasta 2er control");
            res.statusCode = status;
            res.json(data);
        })
            .catch((err) => {
            console.log("llegue hasta 3er control");
            res.statusCode = 500;
            res.json(err);
        });
    }
    GetActividadesXdistancia(req, res) {
        this.longitude = req.params.longitude;
        this.latitude = req.params.latitude;
        this.val = req.params.val / 3963.192;
        Actividad_1.default.find({ 'localizacion': { $within: { $centerSphere: [[this.longitude, this.latitude], this.val] } } })
            .then((data) => {
            let status = 200;
            if (data == null) {
                status = 404;
            }
            res.statusCode = status;
            res.json(data);
        }).catch((err) => {
            res.statusCode = 500;
            res.json(err);
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
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 500;
            res.json(err);
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
        //if (estrellas==null){
        //    estrellas=0;
        //}
        const tags = req.body.tags;
        const propietario = req.body.propietario;
        const actividad = new Actividad_1.default({
            titulo,
            descripcion,
            estrellas,
            tags,
            propietario
        });
        /*
        //intento 1
        this.ComprobarActividad(titulo,propietario, (err:Error, data: Document) => {
            if(err!=null){
                res.statusCode = 404;
                res.json({
                    err
                });
            }else{
                if(data==null){
                    //enviar codigo ya existe
                    res.statusCode = 402;
                    res.json({
                    err
                });
                }else{
                    actividad.save()
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
                    })
                }
            }
        });
        */
        //intento 2
        Actividad_1.default.findOne({ "titulo": titulo, "propietario": propietario })
            .then((data) => {
            if (data == null) {
                actividad.save()
                    .then((data) => {
                    res.statusCode = 200;
                    res.json(data);
                })
                    .catch((err) => {
                    res.statusCode = 404;
                    res.json(err);
                });
            }
            else {
                res.statusCode = 404;
                res.json({
                    data: null
                });
            }
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
        //este funciona sin comprobar, va creando el mismo tantas veces como quieres
        /*
        actividad.save()
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
                    })
        */
    }
    //modificar actividad
    ModificarActividad(req, res) {
        const title = req.params.title;
        const titulo = req.body.titulo;
        const descripcion = req.body.descripcion;
        const estrellas = req.body.estrellas;
        const tags = req.body.tags;
        const propietario = req.body.propietario;
        /*
        const actividad = new Actividad({
            titulo,
            descripcion,
            estrellas,
            tags,
            propietario
        });
        */
        //db.getCollection('actividads').findOneAndUpdate({ "titulo" : "pepito" },
        //{ $set: { "propietario" : "DAV", "estrellas": 5}})
        //Actividad.findOneAndUpdate({ "_id": new ObjectID(id) }, actividad)
        Actividad_1.default.findOneAndUpdate({ "titulo": title }, { $set: { "titulo": titulo, "descripcion": descripcion, "estrellas": estrellas, "tags": tags, "propietario": propietario } })
            .then((data) => {
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
    }
    //@ts-ignore
    routes() {
        //@ts-ignore
        this.router.get('/', this.GetActividades);
        this.router.get('/:titulo', this.GetActividad);
        this.router.get('/propietario/:propietario', this.GetActividadesPropietario);
        this.router.post('/', this.CrearActividad);
        this.router.put('/:title', this.ModificarActividad);
        this.router.get('/dist/:val/:longitude/:latitude', this.GetActividadesXdistancia);
    }
}
//export
//@ts-ignore
const actividadRoutes = new ActividadRouter();
actividadRoutes.routes();
exports.default = actividadRoutes.router;
//# sourceMappingURL=ActividadRouter.js.map