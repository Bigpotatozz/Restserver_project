import { Router } from "express";
import { body ,param} from "express-validator";
import { categoriaExiste, emailExiste, validarCampos, verificarCategoriaProducto} from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";
import { login, loginGoogle } from "../controller/authController.js";
import { validarJWT } from "../middlewares/validarToken.js";
import { deleteCategoria, getCategoria, getCategorias, postCategoria, putCategoria } from "../controller/categoriasController.js";
import { deleteProductos, getProducto, getProductos, postProductos, putProductos } from "../controller/productosController.js";
import { buscar } from "../controller/buscarController.js";

const routerBuscar = Router();

routerBuscar.get("/:coleccion/:termino",buscar);


export {routerBuscar}