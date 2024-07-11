import { Router } from 'express';
import { listarDepartamentos, addDepartamento, deleteDepartamento, updateDepartamento, searchDepartamento, getDepartamentoById } from '../controller/departamentoController.js';
import { verifiarUsuarioToken } from '../controller/usuariosController.js';

const router = Router();

router.get('/', verifiarUsuarioToken, listarDepartamentos);
router.get('/:id', verifiarUsuarioToken, getDepartamentoById);
router.post('/', verifiarUsuarioToken, addDepartamento);
router.delete('/:id', verifiarUsuarioToken, deleteDepartamento);
router.put('/:id', verifiarUsuarioToken, updateDepartamento);

export default router;