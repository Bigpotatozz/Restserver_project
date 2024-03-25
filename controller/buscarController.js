import { Types } from 'mongoose';
const { ObjectId } = Types;
import { UserModel } from "../model/usuario.js";

const colecciones = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuarios = async (termino, res) => {
    try {
        const isMongo = ObjectId.isValid(termino);

        if (!isMongo) {
            return res.json({
                msg: "El ID proporcionado no es válido."
            });
        }

        const user = await UserModel.findById(termino);

        if (user) {
            return res.json({ results: [user] });
        } else {
            return res.json({ results: [] });
        }
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        return res.status(500).json({
            msg: "Hubo un error al buscar usuarios."
        });
    }
};

const buscar = async (req, res) => {
    const { coleccion, termino } = req.params;

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
            // Lógica para buscar categorías
            break;

        case 'productos':
            // Lógica para buscar productos
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
