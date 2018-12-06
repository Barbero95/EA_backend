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
    //get de actividades por tags de preferencia del perfil
    GetActividadesPorTagDePerfil(req, res) {
        const tag = req.params.tagperfil;
        Actividad_1.default.find({ "tags": tag })
            .then((data) => {
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 500;
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
        //para el post 
        let distance = req.body.distance;
        let lat = req.body.latitude;
        let long = req.body.longitude;
        let tag = req.body.tag;
        //intento 3
        Actividad_1.default.find({ 'localizacion': { $within: { $centerSphere: [[lat, long], distance / 3963.192] } }, 'tags': tag })
            //Actividad.find({'localizacion': {$within: {$centerSphere:[[lat,long],distance/3963.192]}}, $text:{$search: tag}})
            //Actividad.find({$text:{$search: tag}})
            //Actividad.find({'localizacion': {$within: {$centerSphere:[[lat,long],distance/3963.192]}}})
            .then((data) => {
            if (data == null) {
                res.statusCode = 404;
                res.json(data);
            }
            else {
                res.statusCode = 200;
                res.json(data);
            }
        })
            .catch((err) => {
            res.statusCode = 500;
            res.json(err);
        });
    }
    BusquedaGeoEnDescripcion(req, res) {
        //para el post 
        let distance = req.body.distance;
        let lat = req.body.latitude;
        let long = req.body.longitude;
        let tag = req.body.tag;
        Actividad_1.default.find({ 'localizacion': { $within: { $centerSphere: [[lat, long], distance / 3963.192] } }, $text: { $search: tag } })
            .then((data) => {
            if (data == null) {
                res.statusCode = 404;
                res.json(data);
            }
            else {
                res.statusCode = 200;
                res.json(data);
            }
        })
            .catch((err) => {
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
            if (data == null) {
                res.statusCode = 404;
                res.json(data);
            }
            else {
                res.statusCode = 200;
                res.json(data);
            }
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
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 500;
            res.json(err);
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
        const localizacion = req.body.localizacion;
        const horasActividad = req.body.horasActividad;
        const contadorEstrellasActividad = req.body.contadorEstrellasActividad;
        console.log(req.body.location);
        const actividad = new Actividad_1.default({
            titulo,
            descripcion,
            propietario,
            estrellas,
            tags,
            horasActividad,
            contadorEstrellasActividad,
            ubicacion,
            localizacion
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
                res.json(data = null);
            }
        })
            .catch((err) => {
            //error en la busqueda
            res.statusCode = 404;
            res.json(err);
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
        const horasActividad = req.body.horasActividad;
        const contadorEstrellasActividad = req.body.contadorEstrellasActividad;
        console.log(titulo);
        console.log(title);
        console.log(propietario);
        Actividad_1.default.findOneAndUpdate({ "titulo": title, "propietario": propietario }, { $set: { "titulo": titulo, "descripcion": descripcion, "estrellas": estrellas, "tags": tags, "propietario": propietario, "horasActividad": horasActividad, "contadorEstrellasActividad": contadorEstrellasActividad } })
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
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 500;
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
        this.router.get('/porPerfil/:tagperfil', this.GetActividadesPorTagDePerfil);
        this.router.post('/', this.CrearActividad);
        this.router.put('/update/:title', this.ModificarActividad);
        this.router.delete('/:propietario/:titulo', this.BorrarActividad);
        /////busqueda 
        this.router.get('/busqueda/:GPS', this.BusquedaGeo);
        this.router.post('/busqueda/:GPS', this.BusquedaGeo);
        this.router.post('/busqueda/En/Descripcion', this.BusquedaGeoEnDescripcion);
    }
}
//export
//@ts-ignore
const actividadRoutes = new ActividadRouter();
actividadRoutes.routes();
exports.default = actividadRoutes.router;
//# sourceMappingURL=ActividadRouter.js.map