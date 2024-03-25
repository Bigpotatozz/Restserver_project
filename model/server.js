import  express  from "express";
import cors from 'cors';
import { router } from "../routes/users.js";
import { dbConnection } from "../database/config.js";
import { routerLogin } from "../routes/auth.js";
import { routerCategorias } from "../routes/categorias.js";
import { routerProductos } from "../routes/productos.js";
import { routerBuscar } from "../routes/buscar.js";
import { routerUploads } from "../routes/uploads.js";
import fileUpload from "express-fileupload";

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.iniciarBD();
        this.middleware();
        this.routes();
        
    }

    async iniciarBD(){
        await dbConnection();
    }

    middleware(){
        //CORS
        this.app.use(cors());
        //LECTURA DE DATOS
        this.app.use(express.json());
        //HTML
        this.app.use(express.static("public"));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use("/api/auth/",routerLogin);
        this.app.use("/api/users",router);
        this.app.use("/api/categorias/", routerCategorias);
        this.app.use("/api/productos/", routerProductos);
        this.app.use("/api/buscar", routerBuscar);
        this.app.use("/api/uploads",routerUploads);
    
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchado en la direccion: http://localhost:${this.port}/`);
        });
    }

}

export {Server}