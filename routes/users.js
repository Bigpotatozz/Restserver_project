import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "../controller/usuarioController.js";
const router = Router();

//TRAER USUARIO
router.get("/", getUser);

//POSTEAR USUARIO
router.post("/", postUser);

//ACTUALIZAR USUARIO
router.put("/", updateUser);

//ELIMINAR USUARIO
router.delete("/", deleteUser);




export {router};