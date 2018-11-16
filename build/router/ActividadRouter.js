"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Actividad_1 = require("../models/Actividad");
//const {Point} = require('mongoose-geojson-schemas');
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
            }
            res.statusCode = status;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 500;
            res.json(err);
        });
    }
    /// buscamos por ubicación
    BusquedaGeo(req, res) {
        //const radio: number = req.body.radio;
        const distance = 1000;
        //const geo: number[] = req.body.geo;
        const lat = 124;
        const long = 124;
        //Intento 1
        Actividad_1.default.findOne({ 'locatio': { $near: [long, lat], $maxDistance: distance } })
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
        /*
       //Intento 2
       var query = Actividad.find({});
       query = query.where('locatio').near({ center: {type: 'Point', coordinates: [long, lat]},
                maxDistance: distance * 1609.34, spherical:true});

        query.exec(function(err, actividades){
            if(err)
                res.send(err);
            else
                res.json(actividades)
        });
        */
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
    GetActividadPropietario(req, res) {
        //const id: number = req.params.id;
        const titulo = req.params.titulo;
        const propietario = req.params.propietario;
        Actividad_1.default.findOne({ "titulo": titulo, "propietario": propietario })
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
        const tags = req.body.tags;
        const propietario = req.body.propietario;
        const ubicacion = req.body.ubicacion;
        const locatio = req.body.location;
        //const geo: number [] = [ req.body.lat, req.body.lng ];
        //const coordinates = 
        //const geo = req.body.geo;
        //let loc: { type:'Point', coordinates: [179.9, 0.0]};
        console.log(req.body.tags);
        console.log(req.body.propietario);
        console.log(req.body.ubicacion);
        console.log(req.body.location);
        const actividad = new Actividad_1.default({
            titulo,
            descripcion,
            propietario,
            estrellas,
            tags,
            ubicacion,
            locatio
        });
        Actividad_1.default.findOne({ "titulo": titulo, "propietario": propietario })
            .then((data) => {
            console.log("ha entrado fase1");
            if (data == null) {
                console.log("ha entrado fase2");
                actividad.save()
                    .then((data) => {
                    //hemos podido crear la actividad
                    console.log("ha entrado 200");
                    res.statusCode = 200;
                    res.json(data);
                })
                    .catch((err) => {
                    //error al crear
                    console.log("ha entrado 404");
                    res.statusCode = 404;
                    res.json(err);
                });
            }
            else {
                //Actividad ya existe
                res.json({
                    data: null
                });
            }
        })
            .catch((err) => {
            //error en la busqueda
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
        console.log(titulo);
        console.log(title);
        console.log(propietario);
        Actividad_1.default.findOneAndUpdate({ "titulo": title, "propietario": propietario }, { $set: { "titulo": titulo, "descripcion": descripcion, "estrellas": estrellas, "tags": tags, "propietario": propietario } })
            .then((data) => {
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
    }
    //Borrar actividad
    BorrarActividad(req, res) {
        const titulo = req.params.titulo;
        const propietario = req.params.propietario;
        Actividad_1.default.findOneAndDelete({ "titulo": titulo, "propietario": propietario })
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
        this.router.get('/', this.GetActividades);
        this.router.get('/:titulo', this.GetActividad);
        this.router.get('/propietario/:propietario', this.GetActividadesPropietario);
        this.router.get('/pidiendo/:propietario/:titulo', this.GetActividadPropietario);
        this.router.post('/', this.CrearActividad);
        this.router.put('/update/:title', this.ModificarActividad);
        this.router.delete('/:propietario/:titulo', this.BorrarActividad);
        /////busqueda 
        this.router.get('/search', this.BusquedaGeo);
    }
}
//export
//@ts-ignore
const actividadRoutes = new ActividadRouter();
actividadRoutes.routes();
exports.default = actividadRoutes.router;
//# sourceMappingURL=ActividadRouter.js.map