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
        });
    }
    //ver un usuario
    GetUser(req, res) {
        const nombre = req.params.nombre;
        User_1.default.findOne({ nombre }).populate('posts', '')
            .then((data) => {
            if (data == null) {
                const status = 404;
            }
            else {
                const status = res.statusCode;
            }
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
        user.save()
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
        });
    }
    //modificar usuario
    UpdateUser(req, res) {
        const username = req.params.username;
        User_1.default.findOneAndUpdate({ username }, req.body)
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
        });
    }
    //borrar usuario
    DeleteUser(req, res) {
        const username = req.params.username;
        User_1.default.findOneAndRemove({ username })
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
        });
    }
    //@ts-ignore
    routes() {
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
exports.default = userRoutes.router;
//# sourceMappingURL=UserRouter.js.map