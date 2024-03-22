
import  jwt  from "jsonwebtoken";


const generarToken = (uid) => {

        return new Promise((resolve, reject) => {
            const payload = {uid}; //EL PAYLOAD ES EL IDENTIFICADOR UNICO DEL USUARIO

            jwt.sign(payload, process.env.FIRMA,{ expiresIn: '24h'}, (err,token) => {

                if(err){
                    reject('No se pudo generar el token');
                }else{
                    resolve(token);
                }
            });

        });

}

export {generarToken}