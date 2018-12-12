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
import ChatRouter from './router/ChatRouter';

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
        const MONGO_URI: string = 'mongodb://localhost/timextime';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI,
          {
            useNewUrlParser: true,
            socketTimeoutMS: 300000,
            keepAlive: 300000,
            reconnectTries: 300000
          }
        );

        //config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use('/uploads', express.static('uploads'));}

    public routes(): void {

        let router: express.Router;
        router = express.Router();
        //@ts-ignore
        this.app.use('/', router);
        this.app.use('/actividades', ActividadRouter);
        this.app.use('/users', UserRouter);
        this.app.use('/chat', ChatRouter);
    }
}

//export 
//@ts-ignore
export default new Server().app;

