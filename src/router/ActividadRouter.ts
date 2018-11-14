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

    public GetActividadPropietario(req: Request, res: Response): void{
        //const id: number = req.params.id;
        const titulo: string = req.params.titulo;
        const propietario: string = req.params.propietario;

        Actividad.findOne({ "titulo": titulo, "propietario": propietario })
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
        //if (estrellas==null){
        //    estrellas=0;
        //}
        const tags: string [] = req.body.tags;
        const propietario: string = req.body.propietario;

        const actividad = new Actividad({
            titulo, 
            descripcion,
            estrellas,
            tags,
            propietario
        });
        Actividad.findOne({ "titulo": titulo, "propietario": propietario})
        .then((data) => {
            if(data==null){
                actividad.save()
                .then((data) => {
                    //hemos podido crear la actividad
                    res.statusCode = 200;
                    res.json(
                        data
                    );
                })
                .catch((err) => {
                    //error al crear
                    res.statusCode = 404;
                    res.json(
                        err
                    );
                })
            }else{
                //Actividad ya existe
                res.json({
                    data: null
                })
            }
        })
        .catch((err) => {
            //error en la busqueda
            res.statusCode = 404;
            res.json(
                err
                );
        })
        
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
    public ModificarActividad(req: Request, res: Response): void{

        const titulo: string = req.body.titulo;
        const descripcion: string = req.body.descripcion;
        const estrellas: number = req.body.estrellas;
        const tags: string [] = req.body.tags;
        const propietario: string = req.body.propietario;
       console.log(titulo);
       console.log(propietario);
        Actividad.findOneAndUpdate({"titulo": titulo , "propietario": propietario}, { $set: {"titulo": titulo, "descripcion" :descripcion, "estrellas": estrellas, "tags": tags, "propietario": propietario}})
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
        const status = 200;
        res.json(
            data
        );
    })
    .catch((err) => {
        const status = 404;
        res.json(
            err
        );
    })
    }
        


    
    



    //@ts-ignore
    routes(){
        //@ts-ignore
        this.router.get('/', this.GetActividades);
        this.router.get('/:titulo', this.GetActividad);
        this.router.get('/propietario/:propietario', this.GetActividadesPropietario);
        this.router.get('/pidiendo/:propietario/:titulo', this.GetActividadPropietario);
        this.router.post('/', this.CrearActividad);
        this.router.put('/update', this.ModificarActividad);
        this.router.delete('/:propietario/:titulo', this.BorrarActividad);

        
    }
}

//export
//@ts-ignore
const actividadRoutes = new ActividadRouter();
actividadRoutes.routes();

export default actividadRoutes.router;
