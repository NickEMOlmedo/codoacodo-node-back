import { Departamento, dbAddDepartamento, dbGetDepartamento, dbDeleteDepartamento, dbUpdateDepartamento, dbSearchDepartamento } from '../models/departamento.js'

export const addDepartamento = async (req, res) => {

    try {

        const { nombre, ubicacion } = req.body;

        if( !nombre || !ubicacion ) {
            res.status(400).json({
                status: 'fail',
                message: 'Todos los campos son requeridos'
            });
        }

        const verificarDepartamento = await dbGetDepartamento(id);

        if(verificarDepartamento.success) {
            return res.status(400).json({
                status: 'fail',
                message: 'El empleado ya existe'
            });
        } else {
            const newDepartamento = new Departamento(nombre, ubicacion);
            const nuevoDepartamentoGuardado = await dbAddDepartamento(newDepartamento);

            return res.status(201).json({
                status: success,
                message: 'Departamento añadido con éxito',
                data: nuevoDepartamentoGuardado
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Ocurrio un error al añadir el departamento',
            error: message.error
        })
    }
}

export const getDepartamento = async (req, res) => {
    try {
        const { id } = req.params;

        if()

    } catch (error) {
        
    }
}