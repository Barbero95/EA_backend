import { Router, Request, Response, NextFunction } from 'express';
import Actividad from '../models/Actividad';
import { default_type } from 'mime';
import bodyParser = require('body-parser');

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
        })

    }
    //ver una actividad
    public GetActividad(req: Request, res: Response): void{
        //const id: number = req.params.id;
        const titulo: string = req.params.titulo;

        Actividad.findOne({ "titulo": titulo })
        .then((data) => {
            let status = 200;
            if(data==null){
                status=404;
            }
            res.statusCode=status;
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
        })
    }
    //ver si esta actividad ya existe para el mismo ususario
    //miramos si hay ya una 
    public ComprobarActividad(titulo:String, propietario: String, callback:(Error,Actividad)=>void): void{
        //p=:promise<err,Actividad>
        //p.then(........) dentro pongo lo que quiero ejecutar
        //p.catch(......) para error
        Actividad.findOne({ "titulo": titulo, "propietario": propietario})
        .then((data) => {
            callback(null,data);
            return;
        })
        .catch((err) => {
            return callback(err,null);
        })
    }
    //crear una actividad
    public CrearActividad(req: Request, res: Response): void{
        const titulo: string = req.body.titulo;
        const descripcion: string = req.body.descripcion;
        let estrellas: number = req.body.estrellas;
        if (estrellas==null){
            estrellas=0;
        }
        const tags: string = req.body.tags;
        const propietario: string = req.body.propietario;

        const actividad = new Actividad({
            titulo, 
            descripcion,
            estrellas,
            tags,
            propietario
        });

        this.ComprobarActividad(titulo,propietario, (err:Error, data: Document) => {
            if(err!=null){
                //enviar codigo ya existe
                const status = 402;
                res.json({
                    status, 
                    err
                });
            }else{
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
                })
            }
        });
    }
    //modificar actividad
    public ModificarActividad(req: Request, res: Response): void{

        const title: string = req.params.title;

        const titulo: string = req.body.titulo;
        const descripcion: string = req.body.descripcion;
        const estrellas: string = req.body.estrellas;
        const tags: string = req.body.tags;
        const propietario: string = req.body.propietario;

        const actividad = new Actividad({
            titulo, 
            descripcion,
            estrellas,
            tags,
            propietario
        });
        
        //Actividad.findOneAndUpdate({ "_id": new ObjectID(id) }, actividad)
        Actividad.findOneAndUpdate({ "title": title}, {$set:{actividad}})
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
        })
            
    }
    //@ts-ignore
    routes(){
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

export default actividadRoutes.router;
