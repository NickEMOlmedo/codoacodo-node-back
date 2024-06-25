const express = require('express');
const router = express.Router();
const { getEmpleado, addEmpleado } = require('../controller/empleadoController');

router.get('/empleado', getEmpleado);
router.post('/empleado', addEmpleado);

module.exports = router;