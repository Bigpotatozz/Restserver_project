import { Types } from 'mongoose';
const { ObjectId } = Types;
import { UserModel } from "../model/usuario.js";
import { CategoriaModel } from '../model/categoria.js';
import { ProductoModel } from '../model/producto.js';

const colecciones = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuarios = async (termino, res) => {
    try {
        const isMongo = ObjectId.isValid(termino);

        if (isMongo) {
        const user = await UserModel.findById(termino);

        if (user) {
            return res.json({ results: [user] });
        } else {
            return res.json({ results: [] });
        }
        }

        
        const regex = new RegExp(termino, 'i');
        
        const usuarios = await UserModel.find({
            $or: [{$and: [{nombre: regex}, {state: true}]}, {$and: [{correo: regex}, {state: true}]}]
        });

        return res.json({
            results: [usuarios]
        })

       
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        return res.status(500).json({
            msg: "Hubo un error al buscar usuarios."
        });
    }
};

const buscarCategorias = async(termino, res) => {
    try {
        const isMongo = ObjectId.isValid(termino);

        if (isMongo) {
        const categoria = await CategoriaModel.findById(termino);

        if (categoria) {
            return res.json({ results: [categoria] });
        } else {
            return res.json({ results: [] });
        }
        }

        const regex = new RegExp(termino, 'i');

        const categorias = await CategoriaModel.find({
            $and: [{nombre: regex}, {state: true}]
        });

        return res.json({
            results: [categorias]
        })

       
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        return res.status(500).json({
            msg: "Hubo un error"
        });
    }
}

const buscarProductos = async(termino, res) => {
    try {
        const isMongo = ObjectId.isValid(termino);

        if (isMongo) {
        const producto = await ProductoModel.findById(termino);

        if (producto) {
            return res.json({ results: [producto] });
        } else {
            return res.json({ results: [] });
        }
        }

        const regex = new RegExp(termino, 'i');

        const productos = await ProductoModel.find({
            $or: [{$and: [{nombre: regex}, {state: true}]}]
        });

        return res.json({
            results: [productos]
        })

       
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        return res.status(500).json({
            msg: "Hubo un error."
        });
    }
}

const buscar = async (req, res) => {
    const {coleccion} = req.params;
    const {termino} = req.params;

    if (!colecciones.includes(coleccion)) {
        return res.status(401).json({
            msg: "Colección no existe"
        });
    }

    switch (coleccion) {
        case 'usuarios':
                await buscarUsuarios(termino, res);

            break;

        case 'categorias':

                await buscarCategorias(termino, res);

            break;

        case 'productos':
            
                await buscarProductos(termino, res)
            break;

        case 'roles':
            // Lógica para buscar roles
            break;

        default:
            return res.status(500).json({
                msg: "Hubo un error"
            });
    }
}

export { buscar };
