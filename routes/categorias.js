import { Router } from "express";
import { body ,param} from "express-validator";
import { categoriaExiste, emailExiste, validarCampos } from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";
import { login, loginGoogle } from "../controller/authController.js";
import { validarJWT } from "../middlewares/validarToken.js";
import { deleteCategoria, getCategoria, getCategorias, postCategoria, putCategoria } from "../controller/categoriasController.js";


const routerCategorias = Router();


routerCategorias.get("/", [], getCategorias);

routerCategorias.get("/:id", [
    validarJWT,
    param('id').isMongoId(),
    validarCampos
],getCategoria);

routerCategorias.post("/",[
validarJWT,
body('nombre').notEmpty(),
categoriaExiste,
validarCampos
], postCategoria);

routerCategorias.put("/:id", [
    validarJWT,
    param('id').isMongoId(),
    body('nombre').notEmpty(),
    validarCampos
],putCategoria);

routerCategorias.delete("/:id", [
    validarJWT,
    param('id').isMongoId(),
    validarCampos
], deleteCategoria);



export {routerCategorias}