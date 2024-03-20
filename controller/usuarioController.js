import bcryptjs from 'bcryptjs';
import { UserModel } from "../model/Usuario.js";
import { validarCampos } from '../middlewares/validarCampos.js';


const getUser = (req, res) => {

    const querys = req.query;

    res.status(201).json({
        message: "Hola mundo GET",
        querys
    });
    res.end();
};

const postUser = async(req, res) => {


    const {nombre, correo, password, role, img, state, google} = req.body;
    const usuario = new UserModel({nombre, correo, password, role, img, state, google});

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.json({
        usuario
    });

}

const updateUser = (req, res) => {
    res.json({
        message: "Hola mundo PUT"
    });
    res.end();
}

const deleteUser = (req, res) => {
    res.json({
        message: "Hola mundo DELETE"
    });
    res.end();
}
export {getUser, postUser, updateUser, deleteUser}