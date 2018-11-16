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
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, { useNewUrlParser: true });
        //config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }
    routes() {
        let router;
        router = express.Router();
        //@ts-ignore
        this.app.use('/', router);
        this.app.use('/actividades', ActividadRouter_1.default);
        this.app.use('/users', UserRouter_1.default);
    }
}
//export 
//@ts-ignore
exports.default = new Server().app;
//# sourceMappingURL=server.js.map