"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// import routers
const ActividadRouter_1 = require("./router/ActividadRouter");
const UserRouter_1 = require("./router/UserRouter");
const ChatRouter_1 = require("./router/ChatRouter");
//server class
//@ts-ignore
class Server {
    //@ts-ignore
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    //@ts-ignore
    config() {
        //set up mongoose
        const MONGO_URI = 'mongodb://localhost/timextime';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
            useNewUrlParser: true,
            socketTimeoutMS: 300000,
            keepAlive: 300000,
            reconnectTries: 300000
        });
        //config
        this.app.use(bodyParser.json());
        //yo david he cambiado el true por un false para la autentificación si no funciona cambiar por true
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use('/uploads', express.static('uploads'));
        ///también de autentificación
        //this.app.use(passport.initialize());
        //var passportMiddleware = require('./middleware/passport');
        //passport.use(passportMiddleware);
    }
    routes() {
        let router;
        router = express.Router();
        //@ts-ignore
        this.app.use('/', router);
        this.app.use('/actividades', ActividadRouter_1.default);
        this.app.use('/users', UserRouter_1.default);
        this.app.use('/chat', ChatRouter_1.default);
    }
}
//export 
//@ts-ignore
exports.default = new Server().app;
//# sourceMappingURL=server.js.map