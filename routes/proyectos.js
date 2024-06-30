import { Router } from 'express';
import { addProyecto, getProyecto, listarProyectos, deleteProyecto, updateProyecto, searchProyecto } from '../controller/proyectoController.js'
import { Proyecto } from '../models/proyecto.js';

const router = Router();

router.get('/', listarProyectos);
router.get('/:id', getProyecto);
router.post('/', addProyecto);
router.delete('/:id', deleteProyecto);
router.put('/:id', updateProyecto);
router.get('/search/:nombre', searchProyecto);

export default router;