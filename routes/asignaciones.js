import { Router } from "express";
import { addAsignacion,getAsignacion,deleteAsignacion,updateAsignacion,listarAsignaciones } from "../controller/asginacionController.js";
import { verifiarUsuarioToken } from "../controller/usuariosController.js";

const router = Router();

router.post('/', verifiarUsuarioToken, addAsignacion);
router.get('/:id', verifiarUsuarioToken, getAsignacion);
router.delete('/:id', verifiarUsuarioToken, deleteAsignacion);
router.put('/:id', verifiarUsuarioToken, updateAsignacion);
router.get('/', verifiarUsuarioToken, listarAsignaciones);

export default router