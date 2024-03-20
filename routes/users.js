import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "../controller/usuarioController.js";
import { body } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";


const router = Router();

//TRAER USUARIO
router.get("/", getUser);

//POSTEAR USUARIO

router.post("/",[
    body('nombre').not().isEmpty(),
    body('correo').isEmail().withMessage("Email no valido"),
    body('password').isLength({min: 6}),
    //body('role').isIn(['ADMIN','USER']),
    body('role').custom(validarRol),
    validarCampos
],postUser);

//ACTUALIZAR USUARIO
router.put("/", updateUser);

//ELIMINAR USUARIO
router.delete("/", deleteUser);




export {router};