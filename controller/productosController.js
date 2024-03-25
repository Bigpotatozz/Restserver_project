import { CategoriaModel } from "../model/categoria.js";
import { ProductoModel } from "../model/producto.js";


const getProductos = async(req, res) => {

    
    const {limit, from} = req.query;

    const promesas = await Promise.all([
        ProductoModel.countDocuments({state: true}),
        ProductoModel.find({state: true}).populate("usuario").populate("categoria").limit(Number(limit)).skip(Number(from))
    ])



    res.status(200).send({
            promesas
    });

}

const getProducto = async(req, res) => {

    

    try{

        const {id} = req.params;

        const producto = await ProductoModel.findById(id).populate("usuario").populate("categoria");

        res.status(200).send({
            producto
        });


    }catch(e){
        res.status(401).send({
            msg: e
        });
    } 

  

}


const postProductos = async(req, res) => {
    
    try{
        const {nombre} = req.body;
        const categoria = req.categoria;
       
        
        let data = {
            nombre,
            usuario: req.usuario._id,
            categoria: categoria
        }

        const producto = new ProductoModel(data);
        await producto.save();

        res.status(200).send({
            producto
        });
    

    }catch(e){
        res.status(500).send({
            msg: e
        })
    }
}


const putProductos = async(req, res) => {    
    try{
        
        const {id} = req.params;
        const {nombre} = req.body;

       
        const producto = await ProductoModel.findByIdAndUpdate(id, {nombre: nombre});

        res.status(200).send({
            producto,
            msg: "Actualizado con exito"
        });
    

    }catch(e){
        res.status(500).send({
            msg: e
        });
    
    }
}

const deleteProductos = async(req, res) => {
    try{

        const {id} = req.params;

        const producto = await ProductoModel.findByIdAndUpdate(id,{state: false});

        res.status(200).send({
            msg: "Todo bien - DELETE"
        });

    }catch(e){
        res.status(500).send({
            msg: e
        });
    }

}

export {getProductos, postProductos, getProducto, putProductos, deleteProductos};