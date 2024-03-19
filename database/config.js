import mongoose from "mongoose";

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS);

        console.log("Conexion establecida");
        
    } catch (error) {
        throw new Error(error);
    }

}


export {dbConnection}