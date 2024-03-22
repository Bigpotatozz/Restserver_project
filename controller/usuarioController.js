import bcryptjs from 'bcryptjs';
import { UserModel } from "../model/usuario.js";
import { validarCampos } from '../middlewares/validarCampos.js';


const getUser = async(req, res) => {

    const {limit, from} = req.query;
     //const usuarios = await UserModel.find({state: true}).limit(Number(limit)).skip(Number(from));
     //const totalRegistros = await UserModel.countDocuments({state: true});

    const promesas = await Promise.all([
        UserModel.countDocuments({state: true}),
        UserModel.find({state: true}).limit(Number(limit)).skip(Number(from))
    ])

    res.status(201).json({
        promesas
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

const updateUser = async(req, res) => {

    const {id} = req.params;
    //EXTRAE DATOS
    const {_id, correo, password, google, role ,...usuarioResto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync(10);
        usuarioResto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(id, usuarioResto);

    res.json({
        user
    });
    res.end();
}

const deleteUser = async(req, res) => {

    const {id} = req.params;
    const uid = req.uid;
    const usuarioValidado = req.usuario;

    //ELIMINACION FISICA
   // const usuarioEliminado = await UserModel.findByIdAndDelete(id);

   const usuarioEliminado = await UserModel.findByIdAndUpdate(id, {state: false})

    res.json({
        usuarioEliminado,
        uid,
        usuarioValidado
    });
    res.end();
}
export {getUser, postUser, updateUser, deleteUser}