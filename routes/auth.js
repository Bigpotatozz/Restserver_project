import { Router } from "express";
import { body ,param} from "express-validator";
import { emailExiste, validarCampos } from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";
import { login, loginGoogle } from "../controller/authController.js";
import { validarJWT } from "../middlewares/validarToken.js";

const routerLogin = Router();

routerLogin.post("/login",[
    body('correo').isEmail(),
    body('password').notEmpty(),
    validarCampos
] ,login);

routerLogin.post("/googleLogin", [],loginGoogle);

export {routerLogin}