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
            res.json(data);
        })
        .catch((err) => {
            const status = 500;
            res.json(err);
        })

}

//ver un usuario
public GetUser(req: Request, res: Response): void{
    const nick: string = req.params.nick;

    User.findOne({ "nick": nick })
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

//crear usuario
public CreateUser(req: Request, res: Response): void{
    const nombre: string = req.body.nombre;
    const apellido: string = req.body.apellido;
    const nick: string = req.body.nick;
    const email: string = req.body.email;
    const estrellas: number = req.body.estrellas;
    const password: string = req.body.password; 
    const imagen: string = req.body.imagen;
    const tags: string[] = req.body.tags;
    const actividadesPropietario: number[] = req.body.actividadesPropietario;
    const actividadesCliente: number[] = req.body.actividadesCliente;
    
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
    User.findOne({ "nick": nick})
        .then((data) => {
            if(data==null){
                user.save()
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
            }else{
                res.statusCode = 404;
                res.json({
                    data: null
                })
            }
        })
        .catch((err) => {
            res.statusCode = 404;
            res.json(
                err
                );
        })
}

//modificar usuario
public UpdateUser(req: Request, res: Response): void{

    const username: string = req.params.username;
    const nombre: string = req.body.nombre;
    const apellido: string = req.body.apellido;
    //const nick: string = req.body.nick;
    const email: string = req.body.email;
    //const estrellas: number = req.body.estrellas;
    const password: string = req.body.password; 
    const imagen: string = req.body.imagen;
    const tags: string[] = req.body.tags;
    //const actividadesPropietario: number = req.body.actividadesPropietario;
    //const actividadesCliente: number = req.body.actividadesCliente;

    User.findOneAndUpdate({"nick": username}, { $set: {"nombre": nombre, "apellido" :apellido, "email": email, "tags": tags, "password": password, "imagen": imagen}})
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

//borrar usuario
public DeleteUser(req: Request, res: Response): void{

    const username: string = req.params.username;

    User.findOneAndRemove({ username })
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
        this.router.get('/', this.GetUsers);
        this.router.get('/:nick', this.GetUser);
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


