import { Schema, model } from "mongoose";


const rol = Schema({

    rol: {
        type: String,
        required: [true, 'Rol obligatorio']
    }

});



const rolModel = model('Role',rol); 
export { rolModel };