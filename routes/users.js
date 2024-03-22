import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "../controller/usuarioController.js";
import { body ,param} from "express-validator";
import { emailExiste, validarCampos } from "../middlewares/validarCampos.js";
import { validarRol } from "../helpers/dbValidators.js";
import { validarJWT } from "../middlewares/validarToken.js";


const router = Router();

//TRAER USUARIO
router.get("/", getUser);

//POSTEAR USUARIO
    //body('role').isIn(['ADMIN','USER']),
router.post("/",[
    body('nombre').not().isEmpty(),
    emailExiste,
    body('correo').isEmail().withMessage("Email no valido"),
    body('password').isLength({min: 6}),
    body('role').custom(validarRol),
    validarCampos
],postUser);

//ACTUALIZAR USUARIO
router.put("/:id",[
    param('id').isMongoId(),
    validarCampos
], updateUser);

//ELIMINAR USUARIO
router.delete("/:id",[
    validarJWT,
    param('id').isMongoId(),
    validarCampos
], deleteUser);




export {router};