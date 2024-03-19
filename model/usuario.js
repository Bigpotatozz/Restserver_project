import { Schema,model } from "mongoose";


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'Correo obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'contraseña obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Rol obligatorio'],
        enum: ['ADMIN', 'USER'],
        default: 'ADMIN'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

const UserModel = model('Users', UsuarioSchema);

export { 
    UserModel
}