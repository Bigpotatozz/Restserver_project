import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "../controller/usuarioController.js";
import { body ,param} from "express-validator";
import { emailExiste, validarCampos } from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";
import { validarJWT } from "../middlewares/validarToken.js";
import { tieneRol } from "../middlewares/validarRol.js";
import { cargarArchivo } from "../controller/uploadsController.js";

const routerUploads = Router();

routerUploads.post("/", cargarArchivo);

export {routerUploads}