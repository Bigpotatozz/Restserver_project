

const validarAdmin = async(req, res, next) => {

    if(!req.usuario){
        return res.status(500).send({
            msg: "Hubo un error"
        })
    };

    const {role} = req.usuario;

    if(role !== "ADMIN"){
        return res.status(401).send({
            msg: "Accion no permitida"
        })
    };

    next();

}

const tieneRol = (...roles) => {


    return (req, res, next) => {

        if(!req.usuario){
            return res.status(500).send({
                msg: "Hubo un error"
            })
        };
        
        
        if(!roles.includes(req.usuario.role)){
            return res.status(401).send({
                msg: "Accion no permitida"
            });
        }

        next();
    }
   
}


export {validarAdmin, tieneRol}