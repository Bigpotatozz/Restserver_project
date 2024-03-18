import  express  from "express";
import cors from 'cors';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middleware();
        this.routes();
        
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.static("public"));
    }

    routes(){
        
        this.app.get("/hola", (req, res) => {
            res.status(201).json({
                message: "Hola mundo"
            });
            res.end();
        })
        this.app.post("/hola", (req, res) => {
            res.json({
                message: "Hola mundo"
            });
            res.end();
        })
        this.app.put("/hola", (req, res) => {
            res.json({
                message: "Hola mundo"
            });
            res.end();
        })
        this.app.delete("/hola", (req, res) => {
            res.json({
                message: "Hola mundo"
            });
            res.end();
        })

    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchado en la direccion: http://localhost:${this.port}/`);
        });
    }

}

export {Server}