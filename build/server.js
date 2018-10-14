"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var compression = require("compression");
var logger = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
// import routers
var PostRouter_1 = require("./router/PostRouter");
var UserRouter_1 = require("./router/UserRouter");
//server class
//@ts-ignore
var Server = /** @class */ (function () {
    //@ts-ignore
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    //@ts-ignore
    Server.prototype.config = function () {
        //set up mongoose
        var MONGO_URI = 'mongodb://localhost/tes';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
        //config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        //@ts-ignore
        this.app.use('/', router);
        this.app.use('/api/v1/posts', PostRouter_1.default);
        this.app.use('/api/v1/users', UserRouter_1.default);
    };
    return Server;
}());
//export 
//@ts-ignore
exports.default = new Server().app;
