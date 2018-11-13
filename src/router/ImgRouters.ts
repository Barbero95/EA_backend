
import { Router, Request, Response, NextFunction } from 'express';
import Image from '../models/Img';
import { default_type } from 'mime';
import bodyParser = require('body-parser');
import * as multer from 'multer';



class ImgRouter{

    router: Router;
    
    constructor(){
        this.router = Router();
        this.routes();
    }





//ver una sola foto

public GetImgUser(req: Request, res: Response): void{
    const id: string = req.params.id;
    const upload = multer ({dest: 'uploads/'})
    res.json(upload.single("pitufo"));
    /*
    Image.find({ "_id": id})
    //Image.findById({ id })
    .then((data) => {
        let status = 200;
        if(data==null){
            status=404;
        }
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

//añadir por primera vez la foto de un usuario

public CreateNewImg(req: Request, res: Response): void{
    //var fs = require('fs');
    //var imageData = fs.readFileSync('imgPath');
    ///path/to/file
    /*
    const image = new Image({
        type: 'image/png',
        //data: imageData
        data: 
    });
    */
    //const upload = multer ({dest: 'uploads/'})
    const image = new Image({
        //nick: req.body.nick,
        avatar: req.file.path
    });
    
    if (req.file) {
        console.log("file!!!")
    }
    
    image.save()
        .then((data) => {
            res.statusCode = 200;
            res.json(
                data
            );
        })
        .catch((err) => {
            res.statusCode = 404;
            res.json(
                err
            );
        })
}

//modificar usuario
public UpdateImgUser(req: Request, res: Response): void{

        
}


    //@ts-ignore
    routes(){
        //const upload = multer ({dest: 'uploads/'})
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
            //cb(null, './uploads/');
            cb(null, '../fotosproyectoea/');
            },
            filename: function(req, file, cb) {
                console.log(" Guardamos el nombre del avatar");
            //cb(null, file.originalname);
            cb(null, "pitufo" + ".png");
            }
        });
        const fileFilter = (req, file, cb) => {
            // reject a file
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
            } else {
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
        this.router.post('/',upload.single('avatar'), this.CreateNewImg);
        //@ts-ignore
        this.router.get('/:id', this.GetImgUser);
        //this.router.put('/:id', this.UpdateImgUser);
        /*
        


        */

    }

}

//export
//@ts-ignore
const imgRoutes = new ImgRouter();
imgRoutes.routes();

export default imgRoutes.router;
