import { CategoriaModel } from "../model/categoria.js";

const getCategorias = async(req, res) => {

    const {limit, from} = req.query;

    const promesas = await Promise.all([
        CategoriaModel.countDocuments({state: true}),
        CategoriaModel.find({state: true}).populate("usuario").limit(Number(limit)).skip(Number(from))
    ])



    res.status(200).send({
            promesas
    });

}

const getCategoria = async(req, res) => {


    try{

        const {id} = req.params;

        const categoria = await CategoriaModel.findById(id).populate("usuario");

        res.status(200).send({
            categoria
        });


    }catch(e){
        res.status(401).send({
            msg: e
        });
    } 

  

}

const postCategoria = async(req, res) => {

    try{

    
        const nombre = req.body.nombre.toUpperCase();
        
        let data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new CategoriaModel(data);
        await categoria.save();

        res.status(200).send({
            categoria
        });
    

    }catch(e){
        res.status(500).send({
            msg: e
        })
    }

   
}

const putCategoria = async(req, res) => {


    try{
        
        const {id} = req.params;
        const categoriaBody = req.body;
        const {state,nombre} = req.body;
        let finalName = nombre.toUpperCase();

       
        const categoria = await CategoriaModel.findByIdAndUpdate(id, {nombre: finalName});

        res.status(200).send({
            categoriaBody,
            msg: "Actualizado con exito"
        });
    

    }catch(e){
        res.status(500).send({
            msg: e
        });
    
    }
    
}

const deleteCategoria = async(req, res) => {


    try{

        const {id} = req.params;

        const categoria = await CategoriaModel.findByIdAndUpdate(id,{state: false});

        res.status(200).send({
            msg: "Todo bien - DELETE"
        });

    }catch(e){
        res.status(500).send({
            msg: e
        });
    }

   

}
export {getCategorias, getCategoria, postCategoria, putCategoria, deleteCategoria}