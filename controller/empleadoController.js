import { Empleado, addEmpleado, getEmpleado, deleteEmpleado, updateEmpleado, searchEmpleado, Empleado } from '../models/empleado';

exports.addEmpleado = async (req, res) => {

    try {

        const { nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo } = req.body;

        if (!nombre || !apellido || !dni || !fecha_contratacion || !salario || !departamento || !pais || !cargo) {

            return res.status(400).json({

                stauts: 'fail',
                message: '¡Todos los campos son requeridos!'
            })
        }

        const verificarEmpleado = await getEmpleado(dni);

        if (verificarEmpleado.success) {

            return res.status(400).json({

                status: 'fail',
                message: '¡El empleado ya existe!'

            })
        } else {

            const newEmpleado = new Empleado(nombre, apellido, fecha_contratacion, salario, departamento, pais, cargo);
            const nuevoEmpleadoGuardado = await addEmpleado(newEmpleado);

            return res.status(201).json({
                status: 'success',
                message: "¡Empleado añadido con Exito!",
                data: nuevoEmpleadoGuardado

            })
        }

    } catch (error) {

        return res.status(500).json({

            status: 'error',
            message: 'Error al añadir el nuevo empleado',
            error: error.message

        })

    }
}


exports.getEmpleado = async (req, res) => {

    try {

        const {dni} = req.body;

        if (typeof dni === 'string') {

            dniNumber = Number(dni);

            if (Number.isFinite(dniNumber)) {

                const empleado = await getEmpleado(dni);
    
                res.status(201).json({
    
                    status: 'success',
                    message: '¡Operacion Realizada Exitosamente!',
                    data: empleado
    
                })
    
            } else {
    
                res.status(401).json({
    
                    status: 'error',
                    message: '¡El dni ingresado no tiene el formato correcto!'
    
                })
            }

        } else {

            res.status(401).json({
    
                status: 'error',
                message: '¡El dni ingresado no tiene el formato correcto!'

            })
        }

    } catch (error) {

        res.status(500).json({

            status: 'error',
            message: 'Error al solicitar el empleado',
            error: error.message

        })
    }
}


exports.deleteEmpleado = async (req, res) => {

    try {

        const {dni} = req.body;

        if (typeof dni === 'string') {
            const dniNumber = Number(dni);

            if (Number.isFinite(dni)) {

                const empleado = await deleteEmpleado(dniNumber);

                res.status(201).json({

                    status: 'success',
                    message: 'Empleado eliminado Exitosamente!',
                    data: empleado
                })

            } else {

                res.status(401).json({

                    status: 'error',
                    message: '¡El dni ingresado no tiene el formato correcto!'

                })
            }
        } else {
            res.status(401).json({
                status: 'error',
                message: '¡El dni ingresado no tiene el formato correcto!'
            })
        }

    } catch (error) {

        res.status(500).json({

            status: 'error',
            message: 'Error al eliminar el empleado',
            error: error.message

        })
    }
}


exports.updateEmpleado = async (req, res) => {

    try {

        const { nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo } = req.body;

        if (!nombre || !apellido || !dni || !fecha_contratacion || !salario || !departamento || !pais || !cargo) {

            return res.status(400).json({

                stauts: 'fail',
                message: '¡Todos los campos son requeridos!'
            })
        }

        const verificarEmpleado = await getEmpleado(dni);

        if (verificarEmpleado.success) {

            const empleadoActualizado = new Empleado(nombre, apellido, fecha_contratacion, salario, departamento, pais, cargo);
            await updateEmpleado(empleadoActualizado);

            return res.status(201).json({
                status: 'success',
                message: "¡Empleado actualizado con Exito!",
                data: empleadoActualizado

            })

        } else {

            return res.status(400).json({

                status: 'fail',
                message: '¡El empleadono existe!'

            })

        }

    } catch (error) {

        return res.status(500).json({

            status: 'error',
            message: '¡Error al actualizar el empleado!',
            error: error.message

        })
    }

}

exports.searchEmpleado = async (req, res) => {

    try {

        const {nombre} = req.body;

        if (typeof nombre == 'string' && nombre.trim() !== '') {

            const empleado = await searchEmpleado(nombre);

            res.status(201).json({

                status: 'success',
                message: '¡Empleado encontrado!',
                data: empleado
            })

        } else {

            res.status(401).json({

                status: 'error',
                message: '¡El nombre tiene un formato incorrecto!'

            })
        }
    } catch (error) {

        res.status(501).json({
            status: 'error',
            message: '¡Error al buscar el empleado!',
            error: error.message
        })

    }


}