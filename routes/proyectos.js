import { Router } from 'express';
import { addProyecto, getProyecto, listarProyectos, deleteProyecto, updateProyecto} from '../controller/proyectoController.js';
import { verifiarUsuarioToken } from '../controller/usuariosController.js';

const router = Router();

router.get('/', verifiarUsuarioToken, listarProyectos);
router.get('/:id', verifiarUsuarioToken, getProyecto);
router.post('/', verifiarUsuarioToken, addProyecto);
router.delete('/:id', verifiarUsuarioToken, deleteProyecto);
router.put('/:id', verifiarUsuarioToken, updateProyecto);


export default router;