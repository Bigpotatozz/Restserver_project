import  path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { subirArchivo } from "../helpers/subirArchivo.js";
import { UserModel } from "../model/usuario.js";
import { model } from "mongoose";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cargarArchivo = async(req, res) => {

    const archivo = req.files.archivo;
    try{

        let extensiones = ['md','jpg','png']
        const pathCompleto = await subirArchivo(archivo,extensiones, 'imagenes');

        return res.status(200).send({
           pathCompleto
        });
    }catch(e){
        return res.status(500).send({
            msg: "Archivo no permitido"
        })
    }
  
 
}

const actualizarFotoEmpleado = async(req, res) => {


    const {id, coleccion} = req.params;
    const archivo = req.files.archivo;

   

    if(!archivo){
        return res.status(401).send({
            msg: "No se adjunto ningun archivo"
        })
    }

    const usuario = await UserModel.findById(id);
    if(!usuario){
        return res.status(401).send({
            msg: "El usuario no existe"
        })
    }

    try{

        if(usuario.img){
            const pathImagen = path.join(__dirname, '../uploads',coleccion,usuario.img);
    
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }
    
        const imagen = await subirArchivo(archivo, undefined, 'usuarios');
    
        usuario.img = imagen;
        await usuario.save();
    
    
        return res.status(200).send({
            usuario
         });

    }catch(e){
        return res.status(500).send({
            msg: e
         });
    }

    
}


const mostrarArchivo = async(req, res) => {

    
    const {id, coleccion} = req.params;
    const usuario = await UserModel.findById(id);
    if(!usuario){
        return res.status(401).send({
            msg: "El usuario no existe"
        })
    }

    try{

        if(usuario.img){
            const pathImagen = path.join(__dirname, '../uploads',coleccion,usuario.img);
    
            if(fs.existsSync(pathImagen)){
                res.sendFile(pathImagen);
            }
            res.status(500).send({
                msg: "No hay imagen"
            })
        }

        res.status(500).send({
            msg: "No hay imagen"
        })
    
    }catch(e){
        return res.status(500).send({
            msg: e
         });
    }


}

export {cargarArchivo, actualizarFotoEmpleado, mostrarArchivo}