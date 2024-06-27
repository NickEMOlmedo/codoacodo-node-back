import { Empleado, dbAddEmpleado, dbGetEmpleado, dbDeleteEmpleado, dbUpdateEmpleado, dbSearchEmpleado} from '../models/empleado.js';

export const addEmpleado = async (req, res) => {
    try {
        const { nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo } = req.body;

        if (!nombre || !apellido || !dni || !fecha_contratacion || !salario || !departamento || !pais || !cargo) {
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

        if (typeof dni === 'string' && dni.trim() !== '') {
            const dniNumber = Number(dni);

            if (Number.isFinite(dniNumber)) {
                const empleado = await dbGetEmpleado(dniNumber);

                return res.status(200).json({
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

        if(typeof dni === 'string' && dni.trim() !== '') {

            const dniNumber = Number(dni);

            if(Number.isFinite(dniNumber)) {
                
                const empleado = await dbDeleteEmpleado(dniNumber);

                return res.status(200).json({
                    status: 'success',
                    message: 'Empleado eliminado con exito',
                    data: empleado
                })
            } else {

                return res.status(400).json({
                    status: 'error',
                    message: '¡El dni no tiene el formato correcto!'
                })
            }
        } else {
            return res.status(400).json({
                status: 'error',
                message: '¡El dni no tiene el formato correcto!'
            })
        }

    } catch (error) {
        
        return res.status(500).json({
            status: 'error',
            message: 'Error al eliminar empleado',
            error: error.message
        })
    }
}