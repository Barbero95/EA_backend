"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const multer = require("multer");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    //ver todos los usuarios
    GetUsers(req, res) {
        User_1.default.find({})
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
    //ver un usuario
    GetUser(req, res) {
        const nick = req.params.nick;
        User_1.default.findOne({ "nick": nick })
            .then((data) => {
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            const status = 500;
            res.json(err);
        });
    }
    getReciboNotificaciones(req, res) {
        const dueñoActividad = req.params.duenoActividad;
        console.log(req.params.duenoActividad);
        User_1.default.find({ "nick": dueñoActividad })
            .then((data) => {
            if (data != null) {
                res.statusCode = 200;
                res.json(data);
            }
            else
                res.json();
        })
            .catch((err) => {
            const status = 500;
            res.json(err);
        });
    }
    /// fucnion para loggearse
    GetLogin(req, res) {
        const nick = req.params.username;
        const password = req.params.password;
        User_1.default.findOne({ "nick": nick, "password": password })
            //.select("_id" )
            .then((data) => {
            if (data == null) {
                res.statusCode = 404;
                res.json({
                    data: null
                });
            }
            else {
                res.statusCode = 200;
                res.json({
                    data
                });
            }
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
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
    CreateUser(req, res) {
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const nick = req.body.nick;
        const email = req.body.email;
        const estrellas = req.body.estrellas;
        const password = req.body.password;
        const imagen = req.body.imagen;
        const tags = req.body.tags;
        const actividadesPropietario = req.body.actividadesPropietario;
        const actividadesCliente = req.body.actividadesCliente;
        const horasUsuario = req.body.horasUsuario;
        const contadorEstrellasUsuario = req.body.contadorEstrellasUsuario;
        const user = new User_1.default({
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
        User_1.default.findOne({ "nick": nick })
            .then((data) => {
            if (data == null) {
                user.save()
                    .then((data) => {
                    res.statusCode = 200;
                    res.json(data);
                })
                    .catch((err) => {
                    res.statusCode = 404;
                    res.json(err);
                });
            }
            else {
                res.statusCode = 404;
                res.json(data = null);
            }
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
    }
    validarUsuario(req, res) {
        User_1.default.findOne({ "nick": req.body.nick, "password": req.body.password })
            .then((data) => {
            console.log("He llegado hasta la validación");
            console.log(req.body.nick);
            console.log(req.body.password);
            console.log(data);
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
    }
    postEnvioNotificaciones(req, res) {
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const nick = req.body.nick;
        const email = req.body.email;
        const estrellas = req.body.estrellas;
        const password = req.body.password;
        const imagen = req.body.imagen;
        const tags = req.body.tags;
        const notificaciones = req.body.notificaciones;
        const actividadesPropietario = req.body.actividadesPropietario;
        const actividadesCliente = req.body.actividadesCliente;
        const horasUsuario = req.body.horasUsuario;
        const contadorEstrellasUsuario = req.body.contadorEstrellasUsuario;
        const user = new User_1.default({
            nombre,
            apellido,
            nick,
            email,
            estrellas,
            password,
            imagen,
            tags,
            notificaciones,
            horasUsuario,
            contadorEstrellasUsuario,
            actividadesPropietario,
            actividadesCliente
        });
        console.log(req.body.nick);
        User_1.default.findOne({ "nick": req.body.nick, "notificaciones": req.body.notificaciones })
            .then((data) => {
            user.save(req.body.nick);
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
    }
    //modificar usuario
    UpdateUser(req, res) {
        const username = req.params.username;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        //const nick: string = req.body.nick;
        const email = req.body.email;
        //const estrellas: number = req.body.estrellas;
        const password = req.body.password;
        const imagen = req.body.imagen;
        const tags = req.body.tags;
        const horasUsuario = req.body.horasUsuario;
        const contadorEstrellasUsuario = req.body.contadorEstrellasUsuario;
        //const actividadesPropietario: number = req.body.actividadesPropietario;
        //const actividadesCliente: number = req.body.actividadesCliente;
        User_1.default.findOneAndUpdate({ "nick": username }, { $set: { "nombre": nombre, "apellido": apellido, "email": email, "tags": tags, "password": password, "imagen": imagen, "horasUsuario": horasUsuario, "contadorEstrellasUsuario": contadorEstrellasUsuario } })
            .then((data) => {
            res.statusCode = 200;
            res.json(data);
        })
            .catch((err) => {
            res.statusCode = 404;
            res.json(err);
        });
    }
    //borrar usuario
    DeleteUser(req, res) {
        const username = req.body.nick;
        User_1.default.findOneAndDelete({ username })
            .then((data) => {
            console.log("intentando borrar" + req.params.nombre);
            const status = 200;
            res.json(data);
        })
            .catch((err) => {
            console.log("intentando borrar pero error" + req.params.nick);
            const status = 404;
            res.json(err);
        });
    }
    //ver una sola foto
    GetImgUser(req, res) {
        const id = req.params.id;
        const upload = multer({ dest: 'uploads/' });
        //res.sendFile("../uploads/dav.png");
        res.json("hola");
    }
    //añadir por primera vez la foto de un usuario
    CreateNewImg(req, res) {
        //const upload = multer ({dest: 'uploads/'})
        let path = req.file.path;
        if (req.file) {
            console.log("file!!!");
        }
    }
    //modificar usuario
    UpdateImgUser(req, res) {
    }
    //@ts-ignore
    routes() {
        //@ts-ignore
        this.router.get('/', this.GetUsers);
        this.router.get('/login/:username/:password', this.GetLogin);
        this.router.get('/:nick', this.GetUser);
        this.router.get('Rnotificaciones/:duenoActividad', this.getReciboNotificaciones);
        this.router.post('/', this.CreateUser);
        this.router.post('/ENotificaciones', this.postEnvioNotificaciones);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/borrar', this.DeleteUser);
        this.router.post('/validacion', this.validarUsuario);
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/');
                //usado en la version anterior
                //cb(null, '../fotosproyectoea/');
                //prueba
                //cb(null, '../frontendapp/src/assets/images');
            },
            filename: function (req, file, cb) {
                console.log(" Guardamos el nombre del avatar");
                //cb(null, file.originalname);
                cb(null, file.originalname + ".png");
            }
        });
        const fileFilter = (req, file, cb) => {
            // reject a file
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            }
            else {
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
        this.router.post('/foto/perfil/:avatar', upload.single('avatar'), this.CreateNewImg);
        //@ts-ignore
        this.router.get('/foto/perfil/:id', this.GetImgUser);
        //this.router.put('/:id', this.UpdateImgUser);
    }
}
//export
//@ts-ignore
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
//# sourceMappingURL=UserRouter.js.map