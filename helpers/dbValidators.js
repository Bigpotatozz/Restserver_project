import { rolModel } from "../model/rol.js";


const validarRol = async(rol) => {
    const existeRol = await rolModel.findOne({rol});
    if(!existeRol){
        throw new Error('El rol no existe');
    }
}


export {validarRol};