import { Empleado, dbAddEmpleado, dbGetEmpleado, dbDeleteEmpleado, dbUpdateEmpleado, dbSearchEmpleado} from '../models/empleado.js';

const validarDni = (dni) => {
    if (typeof dni === 'string' && dni.trim() !== '') {
        const dniNumber = Number(dni);
        return Number.isFinite(dniNumber) ? dniNumber : null;
    }
    return null;
}

export const addEmpleado = async (req, res) => {

    try {
        const { nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo } = req.body;

        if (!nombre || !apellido || !dni || !fecha_contratacion || !salario || !pais || !cargo) {
            return res.status(400).json({
                status: 'fail',
                message: '¡Todos los campos son requeridos!'
            });
        }

        const verificarEmpleado = await dbGetEmpleado(dni);

        if (verificarEmpleado.success) {
            return res.status(400).json({
                status: 'fail',
                message: '¡El empleado ya existe!'
            });
        } else {
            const newEmpleado = new Empleado(nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo);
            const nuevoEmpleadoGuardado = await dbAddEmpleado(newEmpleado);

            return res.status(201).json({
                status: 'success',
                message: "¡Empleado añadido con Éxito!",
                data: nuevoEmpleadoGuardado
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al añadir el nuevo empleado',
            error: error.message
        });
    }
};

export const getEmpleado = async (req, res) => {

    try {
        const { dni } = req.params;
        const dniNumber = validarDni(dni);

            if (dniNumber !== null) {

                const empleado = await dbGetEmpleado(dniNumber);

                return res.status(201).json({
                    status: 'success',
                    message: '¡Operación Realizada Exitosamente!',
                    data: empleado
                });
            } else {
                return res.status(400).json({
                    status: 'error',
                    message: '¡El DNI ingresado no tiene el formato correcto!'
                });
            }

        } catch (error) {

            return res.status(500).json({
                status: 'error',
                message: 'Error al solicitar el empleado',
                error: error.message
            });
        }
};
    

export const deleteEmpleado = async (req, res) => {

    try {
        const { dni } = req.params;
        const dniNumber = validarDni(dni);

            if(dniNumber !== null) {
                
                const empleado = await dbDeleteEmpleado(dniNumber);

                return res.status(201).json({
                    status: 'success',
                    message: 'Empleado eliminado con exito',
                    data: empleado
                });
            } else {

                return res.status(400).json({
                    status: 'error',
                    message: '¡El dni no tiene el formato correcto!'
                });
            }

    } catch (error) {
        
        return res.status(500).json({
            status: 'error',
            message: 'Error al eliminar empleado',
            error: error.message
        });
    }
};

export const updateEmpleado = async (req, res) => {

    try {
        const {dni} = req.params;
        const dniNumber = validarDni(dni);

        if (dniNumber !== null) {

            const empleado = await dbUpdateEmpleado(dniNumber);
    
            return res.status(201).json({
                status: 'success',
                message: 'Empleado actualizado con exito',
                data: empleado
            });
        } else {
            
            return res.status(400).json({
                status: 'error',
                message: '¡El DNI no tiene el formato correcto!'
            });
        }
    } catch (error) {
        
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrio un error al actualizar el empleado',
            error: error.message
        });
    }
};

export const searchEmpleado = async (req, res) => {

    try {
        const { nombre} = req.params;

        if ( typeof nombre === 'string' && nombre.trim() !== '' ) {

            const empleado = await dbSearchEmpleado(nombre);

            return res.status(201).json({
                status: 'success',
                message: 'Empleado encontrado',
                data: empleado
            });
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre no tiene el formato correcto',
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrio un error al buscar el empleado',
            error: error.message
        });
    }
};