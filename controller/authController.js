import { generarToken } from "../helpers/jwtGenerator.js";
import { UserModel } from "../model/usuario.js";
import bcryptjs from 'bcryptjs';


const login = async(req, res) => {

    const {correo, password} = req.body;


    try{

        const user = await UserModel.findOne({correo: correo});

        if(!user){
           return res.status(400).send({
                msg: "Correo incorrecto"
            })
        }


        if(user.state === false){
            return res.status(400).send({
                msg: "Correo incorrecto"
            })
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
        if(!validarPassword){
            return res.status(400).send({
                msg: "Contraseña incorrecta"
            })
        }


        
    const token = await generarToken(user._id);

    res.send({
        user,
        token
    })

    }catch(e){
        res.status(500).send({
            msg: "Ocurrio un error"
        })
    }


 
}

export {login}