import { validationResult } from 'express-validator';
import { UserModel } from '../model/usuario.js';


const validarCampos = (req, res, next) => {
    
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json(errores);
    }

    next();
}


const emailExiste = async(req,res, next) => {
    const {correo} = req.body;
    const verificarEmail = await UserModel.findOne({correo});
    if(verificarEmail){
        return res.status(400).json({
            msg: "Ocurrio un error"
        })
    };

    next();
}


export {validarCampos, emailExiste};