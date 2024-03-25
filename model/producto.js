import { Schema, model } from "mongoose";



const productoSchema =  Schema({

    nombre: {
        type: String,
        required : [true, "Nombre de la categoria requerido"]
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }


});

const ProductoModel = model("Producto",productoSchema);

export {ProductoModel};