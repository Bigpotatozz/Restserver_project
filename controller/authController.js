import { verify } from "../helpers/googleVerify.js";
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


const loginGoogle = async(req, res) => {

    try{
        const {idToken} = req.body;
        const  {nombre,correo,img} = await verify(idToken);

        let usuario = await UserModel.findOne({correo});

        if(!usuario){

            const data = {
                nombre,
                correo,
                password: "123456",
                img,
                role:"USER",
                google:true
            }
            
            usuario = new UserModel(data);
            await usuario.save();

        }
       
        if(usuario.state === false){
            return res.status(401).send({
                msg: "Usuario bloqueado, hable con el administrador"
            })
        }


        const token = await generarToken(usuario._id)


       
    res.status(200).send({
        usuario,
        token
    })


    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }



}

export {login, loginGoogle}