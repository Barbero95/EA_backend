import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';



// import routers
import ActividadRouter from './router/ActividadRouter';
import UserRouter from './router/UserRouter';

//server class
//@ts-ignore
class Server{

    //@ts-ignore
    public app: express.Application;
    //@ts-ignore
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    //@ts-ignore
    public config(){
        
        //set up mongoose
        const MONGO_URI: string = 'mongodb://localhost/test';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        //config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    public routes(): void {

        let router: express.Router;
        router = express.Router();
        //@ts-ignore
        this.app.use('/', router);
        this.app.use('/api/v1/actividades', ActividadRouter);
        this.app.use('/api/v1/users', UserRouter);

    }
}

//export 
//@ts-ignore
export default new Server().app;

