import  path from "path";
import { fileURLToPath } from 'url';
import { subirArchivo } from "../helpers/subirArchivo.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cargarArchivo = async(req, res) => {

    const archivo = req.files.archivo;
    if (!req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).send('No files were uploaded.');
      }
  
      if(!req.files.archivo){
          return res.status(400).send('No files were uploaded.'); 
      }

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

export {cargarArchivo}