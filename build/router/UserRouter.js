"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
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
        const user = new User_1.default({
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
                res.json({
                    data: null
                });
            }
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
        //const actividadesPropietario: number = req.body.actividadesPropietario;
        //const actividadesCliente: number = req.body.actividadesCliente;
        User_1.default.findOneAndUpdate({ "nick": username }, { $set: { "nombre": nombre, "apellido": apellido, "email": email, "tags": tags, "password": password, "imagen": imagen } })
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
        const username = req.params.username;
        User_1.default.findOneAndRemove({ username })
            .then((data) => {
            const status = 200;
            res.json(data);
        })
            .catch((err) => {
            const status = 404;
            res.json(err);
        });
    }
    //@ts-ignore
    routes() {
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
exports.default = userRoutes.router;
//# sourceMappingURL=UserRouter.js.map