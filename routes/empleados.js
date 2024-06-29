import { Router } from 'express';
import { getEmpleado, addEmpleado, deleteEmpleado, updateEmpleado, searchEmpleado } from '../controller/empleadoController.js';

const router = Router();

router.get('/:dni', getEmpleado);
router.post('/', addEmpleado); 
router.delete('/:dni', deleteEmpleado);
router.put('/:dni', updateEmpleado); 
router.get('/search/:nombre', searchEmpleado); 

export default router;
