import { Router } from 'express';
import { getEmpleado, addEmpleado, listarEmpleados, deleteEmpleado, updateEmpleado, searchEmpleado } from '../controller/empleadoController.js';
import { verifiarUsuarioToken } from '../controller/usuariosController.js';

const router = Router();

router.get('/', verifiarUsuarioToken, listarEmpleados);
router.get('/:dni', verifiarUsuarioToken, getEmpleado);
router.post('/', verifiarUsuarioToken, addEmpleado); 
router.delete('/:dni', verifiarUsuarioToken, deleteEmpleado);
router.put('/:dni', verifiarUsuarioToken, updateEmpleado); 

export default router;
