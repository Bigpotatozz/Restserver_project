import { Router } from "express";
import { body ,param} from "express-validator";
import { categoriaExiste, emailExiste, validarCampos, verificarCategoriaProducto} from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";
import { login, loginGoogle } from "../controller/authController.js";
import { validarJWT } from "../middlewares/validarToken.js";
import { deleteCategoria, getCategoria, getCategorias, postCategoria, putCategoria } from "../controller/categoriasController.js";
import { deleteProductos, getProducto, getProductos, postProductos, putProductos } from "../controller/productosController.js";

const routerProductos = Router();

routerProductos.get("/",getProductos);

routerProductos.get("/:id",[
    validarJWT,
    param('id').isMongoId(),
    validarCampos
], getProducto);

routerProductos.post("/", [
    validarJWT,
    body('nombre').notEmpty(),
    verificarCategoriaProducto,
    validarCampos
], postProductos);

routerProductos.put("/:id",[
    validarJWT,
    param('id').isMongoId(),
    body('nombre').notEmpty(),
    validarCampos
], putProductos);

routerProductos.delete("/:id",[
    validarJWT,
    param('id').isMongoId(),
    validarCampos
], deleteProductos);


export {routerProductos};