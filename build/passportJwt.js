"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class PassportJwt {
    constructor() {
        this.token = "";
    }
    //cuando alguien se loguea se le genera el token
    login() {
        console.log("token valor en passport: " + this.token);
        const u = {
            id: 1,
            username: "time4time"
        };
        jsonwebtoken_1.default.sign(u, 'secretkey', { expiresIn: '3600s' }, (err, t) => {
            this.token = t;
        });
        console.log("token valor en passport despues de pedirlo: " + this.token);
        return this.token;
    }
    //extrae el token añadido a la cabecera de http
    verifyToken(req, res, next) {
        jsonwebtoken_1.default.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                //para descomponer la info dentro de lo encriptado es el nick del usuario
                /*
                res.json({
                    authData
                });
                */
                next();
            }
        });
    }
}
exports.PassportJwt = PassportJwt;
//# sourceMappingURL=passportJwt.js.map