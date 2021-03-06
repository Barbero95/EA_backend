import { Router, Request, Response, NextFunction } from 'express';
import Actividad from '../models/Actividad';
import { default_type } from 'mime';
import bodyParser = require('body-parser');
import Valoracion from "../models/Valoracion";
import {Types} from "mongoose";
const jwt = require('jsonwebtoken');

class ActividadRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    //ver todas las actividades
    public GetActividades(req: Request, res: Response): void{

        Actividad.find({})
        .then((data) => {
            let status = 200;
            if(data==null){
                status=404;
            }
            res.statusCode=status;
            res.json(
                data
            );
        })
        .catch((err) => {
            const status = 500;
            res.json(
                err
            );
        })

    }
    //get de actividades por tags de preferencia del perfil
    public GetActividadesPorTagDePerfil(req: Request, res: Response): void{
        const tag: string = req.params.tagperfil;

        Actividad.find({"tags": tag})
        .then((data) => {
            res.statusCode=200;
            res.json(
                data
            );
        })
        .catch((err) => {
            res.statusCode=500;
            res.json(
                err
            );
        })

    }


    //ver actividad segun propietario
    public GetActividadesPropietario(req: Request, res: Response): void{
    
        const propietario: string = req.params.propietario;

        Actividad.find({ "propietario": propietario })
        .then((data) => {
            let status = 200;
            if(data==null){
                status=404;
            }
            res.statusCode=status;
            res.json(
                data
            );
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(
                err
            );
        })
    }
    public GetActividadesCliente(req: Request, res: Response): void{
        const cliente: string = req.params.cliente;
        console.log("el cliente de la actividad es : "+cliente);
        Actividad.find({clientes:{$elemMatch:{idCliente: cliente}}})
        .then((data) => {
            let status = 200;
            if(data==null){
                status=404;
            }
            res.statusCode=status;
            res.json(
                data
            );
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(
                err
            );
        })
    }

    /// buscamos por ubicación
    public BusquedaGeo (req: Request, res: Response){
        //para el post 
        let distance = req.body.distance;
        let lat = req.body.latitude;
        let long = req.body.longitude;
        let tag = req.body.tag;
        
       //intento 3
       Actividad.find({'localizacion': {$within: {$centerSphere:[[lat,long],distance/3963.192]}}, 'tags': tag})
       //Actividad.find({'localizacion': {$within: {$centerSphere:[[lat,long],distance/3963.192]}}, $text:{$search: tag}})
       //Actividad.find({$text:{$search: tag}})
       //Actividad.find({'localizacion': {$within: {$centerSphere:[[lat,long],distance/3963.192]}}})
        .then((data) => {
            if(data==null){
                res.statusCode=404;
                res.json(
                    data
                );
            }else{
                res.statusCode=200;
                res.json(
                    data
                );
            }
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(
                err
            );
        })
    }
    public BusquedaGeoEnDescripcion (req: Request, res: Response){
        //para el post 
        let distance = req.body.distance;
        let lat = req.body.latitude;
        let long = req.body.longitude;
        let tag = req.body.tag;
        
       //Actividad.find({'localizacion': {$within: {$centerSphere:[[lat,long],distance/3963.192]}}, $text:{$search: tag}})
       Actividad.find({$text:{$search: tag}}) 
       .then((data) => {
            if(data==null){
                res.statusCode=404;
                res.json(
                    data
                );
            }else{
                res.statusCode=200;
                res.json(
                    data
                );
            }
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(
                err
            );
        })
    }

    //ver una actividad
    public GetActividad(req: Request, res: Response): void{
        //const id: number = req.params.id;
        const titulo: string = req.params.titulo;

        Actividad.findOne({ "titulo": titulo })
        .then((data) => {
            if(data==null){
                res.statusCode=404;
                res.json(
                    data
                );
            }else{
                res.statusCode=200;
                res.json(
                    data
                );
            }
            
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(
                err
            );
        })
    }

    public GetActividadPropietario(req: Request, res: Response): void{
        //const id: number = req.params.id;
        console.log(req.params.titulo);
        const titulo: string = req.params.titulo;
        const propietario: string = req.params.propietario;

        Actividad.findOne({ "titulo": titulo, "propietario": propietario })
        .then((data) => {
            res.statusCode=200;
            res.json(
                data
            );

        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(
                err
            );
        })
    }

    public GetValoracion(req: Request, res: Response): void{
        const idValoracion: string = req.params.idValoracion;
        console.log ("id valoració: " + idValoracion);

        Valoracion.findOne({ "_id" : idValoracion})
            .then((data) => {
                res.statusCode=200;
                res.json(
                    data
                );

            })
            .catch((err) => {
                res.statusCode = 500;
                res.json(
                    err
                );
            })
    }

    //crear una actividad
    public CrearActividad(req: Request, res: Response): void{
        const titulo: string = req.body.titulo;
        const descripcion: string = req.body.descripcion;
        let estrellas: number = req.body.estrellas;
        const tags: string [] = req.body.tags;
        const clientes: [] = [];
        const propietario: string = req.body.propietario;
        const ubicacion: string = req.body.ubicacion;
        const localizacion: number [] = req.body.localizacion;
        const horasActividad: number = req.body.horasActividad;
        const contadorEstrellasActividad: number = req.body.contadorEstrellasActividad;
        const valoraciones: string[] = req.body.valoraciones;
        const imagen: string = req.body.imagen;

        console.log(req.body.location);
        const actividad = new Actividad({
            titulo, 
            descripcion,
            propietario,
            estrellas,
            tags,
            clientes,
            horasActividad,
            contadorEstrellasActividad,
            ubicacion,
            localizacion,
            valoraciones,
            imagen
        });
        console.log ( titulo);
        console.log ( propietario);
        console.log ( ubicacion);
        console.log ( imagen);
        Actividad.findOne({ "titulo": titulo, "propietario": propietario})
        .then((data) => {
            console.log("ha entrado fase1");
            if(data==null){
                console.log("ha entrado fase2");
                actividad.save()
                .then((data) => {
                    //hemos podido crear la actividad
                    console.log("ha entrado 200");
                    res.statusCode = 200;
                    res.json(
                        data
                    );
                })
                .catch((err) => {
                    //error al crear
                    console.log("ha entrado 404");
                    res.statusCode = 404;
                    res.json(
                        err
                    );
                })
            }else{
                //Actividad ya existe
                res.json(
                    data= null
                )
            }
        })
        .catch((err) => {
            //error en la busqueda
            res.statusCode = 404;
            res.json(
                err
                );
        })
        
    }

    // Crear valoración
    public Valorar (req: Request, res: Response): void{

        const titulo: string = req.body.titulo;
        const idAct: string = req.body.idAct;
        const descripcion: string = req.body.descripcion;
        const propietario: string = req.body.propietario;
        const estrellas: number = req.body.estrellas;

        console.log(propietario);
        console.log(titulo);
        console.log(idAct);

        const valoracion = new Valoracion({
            titulo,
            idAct,
            descripcion,
            propietario,
            estrellas
        });

        valoracion.save()
            .then((data) => {
                //hemos podido crear la actividad
                console.log("ha entrado 200");
                res.statusCode = 200;
                res.json(
                    data
                );
            })
            .catch((err) => {
                //error al crear
                console.log("ha entrado 404");
                res.statusCode = 404;
                res.json(
                    err
                );
            })

    }


    //modificar actividad
    public ModificarActividad(req: Request, res: Response): void{
        const title: string = req.params.title;

        const titulo: string = req.body.titulo;
        const descripcion: string = req.body.descripcion;
        const estrellas: number = req.body.estrellas;
        const tags: string [] = req.body.tags;
        const clientes: [] = req.body.clientes;
        const propietario: string = req.body.propietario;
        const horasActividad: number = req.body.horasActividad;
        const contadorEstrellasActividad: number = req.body.contadorEstrellasActividad;
        const imagen: string = req.body.imagen;
        const valoraciones: string[] = req.body.valoraciones;
        
        console.log(req.body.clientes);
        console.log(req.body.valoraciones);
       console.log(titulo);
       console.log(title);

       console.log(propietario);
       console.log(clientes);
        Actividad.findOneAndUpdate({"titulo": title , "propietario": propietario}, { $set: {"titulo": titulo, "descripcion" :descripcion, "estrellas": estrellas, "tags": tags, "imagen": imagen, "valoraciones": valoraciones,"clientes":clientes, "propietario": propietario, "horasActividad": horasActividad, "contadorEstrellasActividad": contadorEstrellasActividad}})
        .then((data) => {
            res.statusCode = 200;
            res.json(
                data
            );
        })
        .catch((err) => {
            res.statusCode = 404;
            res.json(
                err
            );
        })
            
    }


        //Borrar actividad
    public BorrarActividad(req: Request, res: Response): void{

        const titulo: string = req.params.titulo;
        const propietario: string = req.params.propietario;
       
        
    Actividad.findOneAndDelete({ "titulo": titulo,"propietario": propietario})
    .then((data) => {
        res.statusCode = 200;
        res.json(
            data
        );
    })
    .catch((err) => {
        res.statusCode = 500;
        res.json(
            err
        );
    })
    }
    
    //extrae el token añadido a la cabecera de http
    private verifyToken (req,res,next){
        const bearerHeader = req.headers['authorization'];
        
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            //req.token = bearerToken;
            jwt.verify(bearerToken, 'secretkey', (err, authData) => {
                if(err){
                    res.sendStatus(403);
                }else{
                    //para descomponer la info dentro de lo encriptado es el nick del usuario
                    /*
                    res.json({
                        authData
                    });
                    */
                    next();
                }
            });
        }else{
            res.sendStatus(403);
        }
    }
        


    
    



    //@ts-ignore
    routes(){
        //@ts-ignore
        
        this.router.get('/', this.GetActividades);
        this.router.get('/:titulo',this.verifyToken, this.GetActividad);
        this.router.get('/propietario/:propietario',this.verifyToken, this.GetActividadesPropietario);
        this.router.get('/cliente/:cliente',this.verifyToken, this.GetActividadesCliente);
        this.router.get('/pidiendo/:propietario/:titulo',this.verifyToken, this.GetActividadPropietario);
        this.router.get('/porPerfil/:tagperfil',this.verifyToken, this.GetActividadesPorTagDePerfil);
        this.router.get('/get/valoracion/:idValoracion',this.verifyToken, this.GetValoracion);
        this.router.post('/',this.verifyToken, this.CrearActividad);
        this.router.post('/valorar',this.verifyToken, this.Valorar);
        this.router.put('/update/:title', this.verifyToken, this.ModificarActividad);
        this.router.delete('/:propietario/:titulo',this.verifyToken, this.BorrarActividad);

        /////busqueda 
        this.router.get('/busqueda/:GPS',this.verifyToken, this.BusquedaGeo);
        this.router.post('/busqueda/:GPS',this.verifyToken, this.BusquedaGeo);
        this.router.post('/busqueda/En/Descripcion',this.verifyToken, this.BusquedaGeoEnDescripcion);
    }
}

//export
//@ts-ignore
const actividadRoutes = new ActividadRouter();
actividadRoutes.routes();

export default actividadRoutes.router;
