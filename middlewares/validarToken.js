import  jwt from "jsonwebtoken";
import { UserModel } from "../model/usuario.js";

const validarJWT = async(req, res, next) => {

        const token = req.header('token');

    if(!token){
        return res.status(401).send({
            msg: "No se establacio ningun token"
        })
    }

    try{
        
        const {uid} = jwt.verify(token, process.env.FIRMA);
        req.uid = uid;

        const usuarioValidado = await UserModel.findById(uid);

        //VALIDA QUE EL USUARIO EXISTA EN LA BASE DE DATOS
        if(usuarioValidado){
            return res.status(401).send({
                msg: "Token no valido"
            });
        }

        //VALIDA QUE EL USUARIO ESTE ACTIVO
        if(usuarioValidado.state === false){
            return res.status(401).send({
                msg: "token no valido"
            })
        }

        req.usuario = usuarioValidado;
        next();
    }catch(e){
        return res.status(401).send({
            msg: e
            
        });
    }


 
 

}

export {validarJWT}