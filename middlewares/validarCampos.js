import { validationResult } from 'express-validator';
import { UserModel } from '../model/usuario.js';
import { CategoriaModel } from '../model/categoria.js';


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

const categoriaExiste = async(req, res, next) => {

    const nombre = req.body.nombre.toUpperCase();

    const verificarCategoria = await CategoriaModel.findOne({nombre});

    if(verificarCategoria){
        return res.status(401).send({
            msg: "Categoria ya registrada"
        });
    };
    next();
}


const verificarCategoriaProducto = async(req, res, next) => {

    try{
   
        const categoria = req.body.categoria.toUpperCase();

        let categoriaMatch = await CategoriaModel.findOne({nombre: categoria}); 

        if(!categoriaMatch){
            return res.status(401).send({
                msg: "La categoria no existe"
            })
        }
        if(categoriaMatch.state === false){
            return res.status(401).send({
                msg: "La categoria no existe"
            })
        }

       req.categoria = categoriaMatch;
       next();

    }catch(e){
        res.status(500).send({
            msg: e
        });
    
    }

}



export {validarCampos, emailExiste, categoriaExiste, verificarCategoriaProducto};