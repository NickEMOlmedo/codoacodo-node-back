import { Router } from 'express';
import { getDepartamento, addDepartamento, deleteDepartamento, updateDepartamento, searchDepartamento } from '../controller/departamentoController.js';

const router = Router();

router.get('/:id', getDepartamento);
router.post('/', addDepartamento);
router.delete('/:id', deleteDepartamento);
router.put('/:id', updateDepartamento);
router.get('/search/:nombre', searchDepartamento);

export default router;