import {v4 as uuidv4} from 'uuid';
import  path from "path";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const subirArchivo = (files, extensionesPermitidas = ['pdf','img', 'png'], carpeta = '') => {
 
 
    return new Promise((resolve, reject) => {
        const archivo = files
   
        const archivoPartes = archivo.name.split('.');
        const extension = archivoPartes[archivoPartes.length - 1];
        console.log(extension);
    
        if(!extensionesPermitidas.includes(extension)){
           return reject("Archivo no permitido");
        }
    
        const finalFileName =  uuidv4() + '.' + extension;
          const uploadPath = path.join(__dirname , '../uploads/' ,carpeta,finalFileName);
    
      
        // Use the mv() method to place the file somewhere on your server
        
        archivo.mv(uploadPath, function(err) {
          if (err) {return reject}
      
          resolve('File uploaded!');
        });
        
       
    })
  
    
   
}


export {subirArchivo}