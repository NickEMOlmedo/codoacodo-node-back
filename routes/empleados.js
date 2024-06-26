import { Router } from 'express';
import { getEmpleado, addEmpleado } from '../controller/empleadoController.js';

const router = Router();

router.get('/:dni', getEmpleado);
router.post('/', addEmpleado);

router.get('/', (req, res) => {
    res.json ({
        mensaje: 'Hola desde empleados'
    });
});

export default router;
