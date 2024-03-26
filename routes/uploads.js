import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "../controller/usuarioController.js";
import { body ,param} from "express-validator";
import { emailExiste, validarCampos } from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";
import { validarJWT } from "../middlewares/validarToken.js";
import { tieneRol } from "../middlewares/validarRol.js";
import { actualizarFotoEmpleado, cargarArchivo, mostrarArchivo } from "../controller/uploadsController.js";
import { coleccionesPermitidas } from "../helpers/validarColecciones.js";
import { validarArchivo } from "../middlewares/validarArchivo.js";

const routerUploads = Router();

routerUploads.post("/",[
    validarArchivo,
    validarCampos
], cargarArchivo);

routerUploads.put("/:coleccion/:id", [
    validarJWT,
    param('id').isMongoId(),
    param('coleccion').custom(coleccion => coleccionesPermitidas(coleccion, ['usuarios'])),
    validarArchivo,
    validarCampos
],actualizarFotoEmpleado);

routerUploads.get("/:coleccion/:id", [
    param('id').isMongoId(),
    param('coleccion').custom(coleccion => coleccionesPermitidas(coleccion,['usuarios'])),
    validarCampos
], mostrarArchivo)

export {routerUploads}