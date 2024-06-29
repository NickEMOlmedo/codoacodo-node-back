import { Router } from "express";
import { addAsignacion,getAsignacion,deleteAsignacion,updateAsignacion,listarAsignaciones_empleado } from "../controller/asginacionController.js";

const router = Router();

router.post('/',addAsignacion)
router.get('/',getAsignacion)
router.delete('/',deleteAsignacion)
router.put('/',updateAsignacion)
router.get('/',listarAsignaciones_empleado)

export default router