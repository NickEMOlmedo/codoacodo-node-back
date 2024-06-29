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
            error: error.message
        })
    }
}


export const getDepartamento = async (req, res) => {
    try {
        const { id } = req.params;
        const departamento = await dbGetDepartamento(id);

        if (departamento.success) {
            return res.status(200).json({
                status: 'success',
                message: '¡Departamento encontrado!',
                data: departamento.data
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: '¡Departamento no encontrado!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al buscar el departamento',
            error: error.message
        });
    }
};

export const deleteDepartamento = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await dbDeleteDepartamento(id);

        if (resultado.success) {
            return res.status(200).json({
                status: 'success',
                message: '¡Departamento eliminado con éxito!'
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: '¡Departamento no encontrado!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el departamento',
            error: error.message
        });
    }
};

export const updateDepartamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, ubicacion } = req.body;
        const departamento = new Departamento(nombre, ubicacion);
        departamento.id = id;

        const resultado = await dbUpdateDepartamento(departamento);

        if (resultado.success) {
            return res.status(200).json({
                status: 'success',
                message: '¡Departamento actualizado con éxito!'
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: '¡Departamento no encontrado!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el departamento',
            error: error.message
        });
    }
};

export const searchDepartamento = async (req, res) => {
    try {
        const { nombre } = req.params;
        const resultado = await dbSearchDepartamento(nombre);

        if (resultado.success) {
            return res.status(200).json({
                status: 'success',
                message: '¡Departamento encontrado!',
                data: resultado.data
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: '¡Departamento no encontrado!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al buscar el departamento',
            error: error.message
        });
    }
};