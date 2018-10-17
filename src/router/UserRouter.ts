import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { default_type } from 'mime';
import bodyParser = require('body-parser');


class UserRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }


//ver todos los usuarios
public GetUsers(req: Request, res: Response): void{

        User.find({})
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

//ver un usuario
public GetUser(req: Request, res: Response): void{
    const nombre: string = req.params.nombre;

    User.findOne({ nombre }).populate('posts', '')
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

//crear usuario
public CreateUser(req: Request, res: Response): void{
    const nombre: string = req.body.nombre;
    const apellido: string = req.body.apellido;
    const nick: string = req.body.nick;
    const email: string = req.body.email;
    const estrellas: number = req.body.estrellas;
    const password: string = req.body.password; 
    const imagen: string = req.body.imagen;
    const tags: string = req.body.tags;
    const actividadesPropietario: string = req.body.actividadesPropietario;
    const actividadesCliente: string = req.body.actividadesCliente;
    
    const user = new User({
        nombre, 
        apellido, 
        nick,
        email, 
        estrellas,
        password,
        imagen, 
        tags, 
        actividadesPropietario, 
        actividadesCliente

    });

    user.save()
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

//modificar usuario
public UpdateUser(req: Request, res: Response): void{

    const username: string = req.params.username;

    User.findOneAndUpdate({ username }, req.body)
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

//borrar usuario
public DeleteUser(req: Request, res: Response): void{

    const username: string = req.params.username;

    User.findOneAndRemove({ username })
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
        this.router.get('/', this.GetUsers);
        this.router.get('/:nombre', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    }

}

//export
//@ts-ignore
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;


