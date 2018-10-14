"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    //ver todos los usuarios
    UserRouter.prototype.GetUsers = function (req, res) {
        User_1.default.find({})
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    //ver un usuario
    UserRouter.prototype.GetUser = function (req, res) {
        var nombre = req.params.nombre;
        User_1.default.findOne({ nombre: nombre }).populate('posts', '')
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    //crear usuario
    UserRouter.prototype.CreateUser = function (req, res) {
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var nick = req.body.nick;
        var email = req.body.email;
        var estrellas = req.body.estrellas;
        var password = req.body.password;
        var imagen = req.body.imagen;
        var tags = req.body.tags;
        var actividadesPropietario = req.body.actividadesPropietario;
        var actividadesCliente = req.body.actividadesCliente;
        var user = new User_1.default({
            nombre: nombre,
            apellido: apellido,
            nick: nick,
            email: email,
            estrellas: estrellas,
            password: password,
            imagen: imagen,
            tags: tags,
            actividadesPropietario: actividadesPropietario,
            actividadesCliente: actividadesCliente
        });
        user.save()
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    //modificar usuario
    UserRouter.prototype.UpdateUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndUpdate({ username: username }, req.body)
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    //borrar usuario
    UserRouter.prototype.DeleteUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndRemove({ username: username })
            .then(function (data) {
            var status = req.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = req.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    //@ts-ignore
    UserRouter.prototype.routes = function () {
        //@ts-ignore
        this.router.get('/', this.GetUsers);
        this.router.get('/:nombre', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    };
    return UserRouter;
}());
//export
//@ts-ignore
var userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
