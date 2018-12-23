import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Notificacion from '../models/Notificacion';
import { default_type } from 'mime';
import bodyParser = require('body-parser');
import * as multer from 'multer';
import Actividad from '../models/Actividad';
import { ObjectId } from 'bson';
const jwt = require('jsonwebtoken');
//import {config} from '../config/config';
import jwt from 'jsonwebtoken';



class UserRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    /* para crear autentificación más currada
    private createToken(user) {
        return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
            expiresIn: 200 // 86400 expires in 24 hours
          });
        
       //const token =  "1a2b3c4d";
       //return token;
    }
    */


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

//encontrar usuario por id
public getUsuarioById(req: Request, res: Response): void{
    const id: string = req.body.id;
    console.log(id);
    User.findOne({ "_id": id })
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

//encontrar usuario por referencia
public getUsuarioByIdRef(req: Request, res: Response): void{
    const refId: string = req.body.idRef;
    console.log(refId)
    User.findOne({ "user.$id": refId })
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


public getReciboNotificaciones(req: Request, res: Response): void{
    const dueñoActividad: string = req.params.duenoActividad;

    console.log("el dueño", dueñoActividad);
    Notificacion.find({"dueñoActividad":dueñoActividad, "flag":1})
    .then((data) => {
        if(data != null){
        res.statusCode=200;
        res.json(
            data
        );}
        else
        res.json();
    })
    .catch((err) => {
        const status = 500;
        res.json(
            err
        );
    })

}
public GetUserById(req: Request, res: Response): void{

    const idusuario: string = req.params.idCliente;
    console.log(idusuario);
    jwt.verifyToken
    User.findOne({ "_id": idusuario })
    .then((data) => {
        console.log("la data es: " + data)
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
public GetUserByRef(req: Request, res: Response): void{

    const ref: string = req.params.ref;
    console.log(ref);

    User.findOne({ "user.$id": ref })
    .then((data) => {
        console.log("la data es: " + data)
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



// yo david he añadido authentificación enviamos solo el token
//no es necesario enviar el usuario en el frontend si llega el 200
//se ha puesto un temporizador de validez de 3600s -> a 1h
public validarUsuario(req: Request, res: Response): void{
    const u = {
        id:1,
        username: req.body.nick,
        password: req.body.password
    }
    
    User.findOne({ "nick": req.body.nick, "password": req.body.password})
        .then((data) => {
            console.log("He llegado hasta la validación");
            console.log(req.body.nick);
            console.log(req.body.password);
            console.log(data);
                res.statusCode = 200;
                jwt.sign(u, 'secretkey',{ expiresIn: '3600s' }, (err, token) => {
                    res.json({
                        token
                    });
                });
                /*
                res.json({
                    //data
                });
                */
        })
        .catch((err) => {
            res.statusCode = 404;

            res.json(
                err
                );
        })
    
}



public postEnvioNotificaciones(req: Request, res: Response): void{
    
    console.log(req.body.dueñoActividad);
    console.log(req.body.participanteActividad);
    console.log(req.body.tituloActividad);

    const duenoActividad: string = req.body.dueñoActividad;
    const participanteActividad: string = req.body.participanteActividad;
    const tituloActividad: string = req.body.tituloActividad;
    const flag: string = req.body.flag;

  //  const participanteAct = new User();
  //  participanteAct._id= participanteActividad;

    //const duenoAct = new Actividad();
    //duenoAct.propietario = duenoActividad;

  // const tituloAct = new Actividad();
   // tituloAct._id = tituloActividad;
    
    const notificacion = new Notificacion({
        dueñoActividad: duenoActividad,
        participanteActividad: participanteActividad,
        tituloActividad: tituloActividad,
        flag: flag
    });

    console.log("titulo de la actividad", tituloActividad);
    console.log("notificacion", notificacion);
    Notificacion.find({ "dueñoActividad": duenoActividad, "participanteActividad": participanteActividad, "tituloActividad": tituloActividad, "flag": 1})
        .then((data) => {
                console.log("POSTENotif::data==null", data);
                notificacion.save().then((data) => {
                    console.log("save!!!!!!");
                    res.statusCode = 200;
                    res.json(
                        data
                    );
                })
                .catch((err) => {
                    console.log("err: ", err);
                    res.statusCode = 404;
                    res.json(
                        err
                    );
                })
            
        })
        .catch((err) => {
            console.log("err", err);
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


public putNotificacion(req: Request, res: Response): void{

    const tituloActividad: string = req.params.tituloActividad;
    const participanteActividad: string = req.params.participanteActividad;
    const dueñoActividad: string = req.params.dueñoActividad;
   
    console.log("llega aqui");
    Notificacion.findOneAndUpdate({ "tituloActividad": tituloActividad,"participanteActividad":participanteActividad,"dueñoActividad":dueñoActividad}, { $set: {"flag": 0}})
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

public postRechazoNotificaciones(req: Request, res: Response): void{

    const tituloActividad: string = req.params.tituloActividad;
    const participanteActividad: string = req.params.participanteActividad;
    const dueñoActividad: string = req.params.dueñoActividad;
   
    console.log("llega aqui");
    Notificacion.findOneAndUpdate({ "tituloActividad": tituloActividad,"participanteActividad":participanteActividad}, { $set: {"flag": 0}})
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



public deleteNotificacion(req: Request, res: Response): void{

    const tituloActividad: string = req.params.tituloActividad;
    const participanteActividad: string = req.params.participanteActividad;
    const dueñoActividad: string = req.params.dueñoActividad;
   
    console.log("llega aqui");
Notificacion.deleteMany({ "tituloActividad": tituloActividad,"participanteActividad":participanteActividad,"dueñoActividad":dueñoActividad})
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
}
//modificar usuario
public UpdateImgUser(req: Request, res: Response): void{

        
}

//extrae el token añadido a la cabecera de http
private verifyToken (req,res,next){
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secretkey', (err, authData) => {
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
        this.router.get('/',  this.GetUsers);
        this.router.get('/login/:username/:password', this.GetLogin);
        this.router.get('/userByRef/:ref', this.verifyToken, this.GetUserByRef);
        this.router.get('/userById/:idCliente', this.verifyToken, this.GetUserById);
        this.router.get('/:nick', this.verifyToken, this.GetUser);
        this.router.get('/Rnotificaciones/:duenoActividad',this.getReciboNotificaciones);
        this.router.post('/getUserById', this.verifyToken, this.getUsuarioById);
        this.router.post('/getUserByRef',this.verifyToken, this.getUsuarioByIdRef);
        this.router.post('/', this.CreateUser);
        this.router.post('/ENotificaciones', this.postEnvioNotificaciones);
        this.router.post('/RechazoNotificaciones/:participanteActividad/:tituloActividad', this.postRechazoNotificaciones);
        this.router.put('/:username',this.verifyToken, this.UpdateUser);
        this.router.put('/Unotificacion', this.putNotificacion);
        this.router.delete('/borrar',this.verifyToken, this.DeleteUser);
        this.router.delete('/borrarnotificacion/:dueñoActividad/:participanteActividad/:tituloActividad', this.deleteNotificacion);
        this.router.post('/validacion', this.validarUsuario);

        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
            cb(null, './uploads/');
            //usado en la version anterior
            //cb(null, '../fotosproyectoea/');
            //prueba
            //cb(null, '../frontendapp/src/assets/images');
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


