import { Schema, model } from "mongoose";


const CategoriaSchema =  Schema({

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
    }

});

const CategoriaModel = model("Categoria",CategoriaSchema);

export {CategoriaModel};