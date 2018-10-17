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
        })

    }
    //ver una actividad
    public GetActividad(req: Request, res: Response): void{
        //const id: number = req.params.id;
        const titulo: string = req.params.titulo;

        Actividad.findOne({ titulo })
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
        })
    }
    //crear una actividad
    public CrearActividad(req: Request, res: Response): void{
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
        })
    }
    //modificar actividad
    public ModificarActividad(req: Request, res: Response): void{

        const id: number = req.params.id;
        //const titulo: string = req.params.titulo;
        //const descripcion: string = req.params.descripcion;
        //const tags: string[] = req.params.tags;
        //const propietario: string = req.params.propietario;
        
        Actividad.findOneAndUpdate({ id }, req.body)
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
        })
            
    }
    //@ts-ignore
    routes(){
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

export default actividadRoutes.router;
