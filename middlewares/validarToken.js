import  jwt from "jsonwebtoken";

const validarJWT = (req, res, next) => {

    const token = req.header('token');

    if(!token){
        return res.status(401).send({
            msg: "No se establacio ningun token"
        })
    }

    try{
        
        const {uid} = jwt.verify(token, process.env.FIRMA);
        req.uid = uid;
        next();
    }catch(e){
        return res.status(401).send({
            msg: e
        });
    }


 
 

}

export {validarJWT}