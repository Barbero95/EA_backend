import { Router, Request, Response, NextFunction } from 'express';
import { default_type } from 'mime';
import bodyParser = require('body-parser');
import Denuncia from '../models/Denuncia';

class DenunciaRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    //ver todas las denuncias
    public GetDenuncias(req: Request, res: Response): void{
        Denuncia.find({})
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

    //crear una denuncia
    public CrearDenuncia(req: Request, res: Response): void{
        const resumen: string = req.body.resumen;
        const explicacion: string = req.body.explicacion;
        const denunciante: string = req.body.denunciante;
        const denunciado: string = req.body.denunciado;
        const idActividadDenunciada: string = req.body.idActividadDenunciada;
        const denuncia = new Denuncia({
            resumen, 
            explicacion,
            denunciante,
            denunciado,
            idActividadDenunciada,
        });
        console.log(denuncia);
        denuncia.save()
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

        //Borrar denuncia
        public BorrarDenuncia(req: Request, res: Response): void{

            const _id: number = req.params._id;
            
        Denuncia.findOneAndDelete({ "id": _id,})
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
        this.router.get('/', this.GetDenuncias);
        this.router.post('/', this.CrearDenuncia);
        this.router.delete('/:id', this.BorrarDenuncia);
    }
}

//export
//@ts-ignore
const denunciaRoutes = new DenunciaRouter();
denunciaRoutes.routes();

export default denunciaRoutes.router;
