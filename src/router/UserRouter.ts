import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { default_type } from 'mime';
import bodyParser = require('body-parser');
import * as multer from 'multer';


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
        res.statusCode=200;
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

/// fucnion para loggearse
public GetLogin(req: Request, res: Response): void{
    const nick: string = req.params.username;
    const password: string = req.params.password;

        User.findOne({ "nick": nick, "password": password})
        //.select("_id" )
        .then((data) => {
            if(data==null){
                res.statusCode = 404;
                res.json({
                    data: null
                }) 
            }else{
                res.statusCode = 200;
                res.json({
                    data
                })
            }
        })
        .catch((err) => {
            res.statusCode = 404;
            res.json(
                err
                );
        })
    

    /*
    User.findOne({ "nick": nick }).select("password -_id" )
    .then((data) => {
        console.log(data);
        let status = 200;
        if(data==null){
            status=404;
        }
        else  {
            console.log(data.toString())
            if(data.toString() !=password ){
                status=410;
            }
        }
        console.log(status);
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
    */

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
    const horasUsuario: number = req.body.horasUsuario;
    const contadorEstrellasUsuario: number = req.body.contadorEstrellasUsuario;
    
    const user = new User({
        nombre, 
        apellido, 
        nick,
        email, 
        estrellas,
        password,
        imagen, 
        tags,
        horasUsuario,
        contadorEstrellasUsuario,
        actividadesPropietario, 
        actividadesCliente
    });

    console.log(user);
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
                res.json(
                    data = null
                )
            }
        })
        .catch((err) => {
            res.statusCode = 404;
            res.json(
                err
                );
        })
}

public validarUsuario(req: Request, res: Response): void{
    
    User.findOne({ "nick": req.body.nick, "password": req.body.password})
        .then((data) => {
            console.log("He llegado hasta la validación");
            console.log(req.body.nick);
            console.log(req.body.password);
            console.log(data);
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
    const horasUsuario: number = req.body.horasUsuario;
    const contadorEstrellasUsuario: number = req.body.contadorEstrellasUsuario;
    //const actividadesPropietario: number = req.body.actividadesPropietario;
    //const actividadesCliente: number = req.body.actividadesCliente;

    User.findOneAndUpdate({"nick": username}, { $set: {"nombre": nombre, "apellido" :apellido, "email": email, "tags": tags, "password": password, "imagen": imagen, "horasUsuario": horasUsuario, "contadorEstrellasUsuario": contadorEstrellasUsuario}})
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

    const username: string = req.body.nick;

    User.findOneAndDelete({ username })
    .then((data) => {
        console.log("intentando borrar" + req.params.nombre);
        const status = 200;
        res.json(
            data
        );
    })
    .catch((err) => {
        console.log("intentando borrar pero error" + req.params.nick);
        const status = 404;
        res.json(
            err
        );
    })
        
}

//ver una sola foto

public GetImgUser(req: Request, res: Response): void{
    const id: string = req.params.id;
    const upload = multer ({dest: 'uploads/'})
    //res.sendFile("../uploads/dav.png");
    res.json("hola");
    
    }
    //añadir por primera vez la foto de un usuario

public CreateNewImg(req: Request, res: Response): void{

    //const upload = multer ({dest: 'uploads/'})

    let path = req.file.path;
    
    if (req.file) {
        console.log("file!!!")
    }
    /*
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
    */
}
//modificar usuario
public UpdateImgUser(req: Request, res: Response): void{

        
}



    //@ts-ignore
    routes(){
        //@ts-ignore
        this.router.get('/', this.GetUsers);
        this.router.get('/login/:username/:password', this.GetLogin);
        this.router.get('/:nick', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/borrar', this.DeleteUser);
        this.router.post('/validacion', this.validarUsuario);

        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
            cb(null, './uploads/');
            //usado en la version anterior
            //cb(null, '../fotosproyectoea/');
            //prueba
            cb(null, '../frontendapp/src/assets/images');
            },
            filename: function(req, file, cb) {
                console.log(" Guardamos el nombre del avatar");
            //cb(null, file.originalname);
            cb(null, file.originalname + ".png");
            }
        });
        const fileFilter = (req, file, cb) => {
            // reject a file
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
            } else {
            cb(null, false);
            }
        };
        const upload = multer({
            storage: storage,
            limits: {
            fileSize: 1024 * 1024 * 5
            },
            fileFilter: fileFilter
        });
        this.router.post('/foto/perfil/:avatar',upload.single('avatar'), this.CreateNewImg);
        //@ts-ignore
        this.router.get('/foto/perfil/:id', this.GetImgUser);
        //this.router.put('/:id', this.UpdateImgUser);
    }

}

//export
//@ts-ignore
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;


