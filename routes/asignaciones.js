import { Router } from "express";
import { addAsignacion,getAsignacion,deleteAsignacion,updateAsignacion,listarAsignaciones } from "../controller/asginacionController.js";

const router = Router();

router.post('/',addAsignacion)
router.get('/:id',getAsignacion)
router.delete('/:id',deleteAsignacion)
router.put('/:id',updateAsignacion)
router.get('/',listarAsignaciones)

export default router