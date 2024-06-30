import { Router } from 'express';
import { listarDepartamentos, addDepartamento, deleteDepartamento, updateDepartamento, searchDepartamento, getDepartamentoById } from '../controller/departamentoController.js';

const router = Router();

router.get('/', listarDepartamentos);
router.get('/:id', getDepartamentoById);
router.post('/', addDepartamento);
router.delete('/:id', deleteDepartamento);
router.put('/:id', updateDepartamento);
router.get('/search/:nombre', searchDepartamento);

export default router;