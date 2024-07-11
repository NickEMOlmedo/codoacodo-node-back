import { Departamento, dbAddDepartamento, dbListarDepartamentos, dbGetDepartamentoById, dbDeleteDepartamento, dbUpdateDepartamento, dbSearchDepartamento } from '../models/departamento.js'

export const addDepartamento = async (req, res) => {
    try {
        const { nombre, ubicacion } = req.body;

        if (!nombre || !ubicacion) {
            return res.status(400).json({
                status: 'fail',
                message: 'Todos los campos son requeridos'
            });
        }

        const verificarDepartamento = await dbSearchDepartamento(nombre);

        if (verificarDepartamento.success) {
            return res.status(400).json({
                status: 'fail',
                message: 'El departamento ya existe'
            });
        } else {
            const newDepartamento = new Departamento(nombre, ubicacion);
            const nuevoDepartamentoGuardado = await dbAddDepartamento(newDepartamento);

            return res.status(201).json({
                status: 'success',
                message: 'Departamento añadido con éxito',
                data: nuevoDepartamentoGuardado
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error al añadir el departamento',
            error: error.message
        });
    }
};

export const listarDepartamentos = async (req, res) => {
    try {
        const departamentos = await dbListarDepartamentos();

        if (departamentos.success) {
            return res.status(200).json({
                status: 'success',
                message: 'Departamentos encontrados',
                data: departamentos
            })
        } else {
            return res.status(404).json({
                status: 'fail',
                message: '¡Departamentos no encontrados!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al buscar los departamentos',
            error: error.message
        });
    }
}

export const getDepartamentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const departamento = await dbGetDepartamentoById(id);

        if (departamento.success) {
            return res.status(200).json({
                status: 'success',
                message: '¡Departamento encontrado!',
                data: departamento
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

