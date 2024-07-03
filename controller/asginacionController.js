import { Asignacion, dbAddAsignacion, dbGetAsignacion, dbDeleteAsignacion, dbUpdateAsignacion, dbListarAsignaciones } from "../models/asignacion.js";

const validar_asignacion_id = (empleado_id) => {
    if (typeof empleado_id === 'string' && empleado_id.trim() !== '') {
        const empleado_id_number = Number(empleado_id);
        return Number.isFinite(empleado_id_number) ? empleado_id_number : null;
    }
}

export const addAsignacion = async (req, res) => {
    try {
        const { empleado_id, proyecto_id, fecha_asignacion, horas_trabajadas } = req.body;

        if (!empleado_id || !proyecto_id || !fecha_asignacion || !horas_trabajadas) {
            return res.status(400).json({
                status: 'fail',
                message: 'Todos los campos son requeridos!'
            });
        }
        const newAsignacion = {       
            empleado_id: empleado_id,
            proyecto_id: proyecto_id,
            fecha_asignacion: fecha_asignacion,
            horas_trabajadas: horas_trabajadas,
        };
            const nuevaAsignacionGuardada = await dbAddAsignacion(newAsignacion);

            if (nuevaAsignacionGuardada.success) {
                
                return res.status(201).json({
                    status: 'success',
                    message: 'Asignación añadida con éxito!',
                    data: nuevaAsignacionGuardada.data
                });
            }else{
                return res.status(400).json({
                    status: 'error',
                    message: 'no se pudo añadir asignacion',
                    
                });
            }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al añadir la nueva asignación',
            error:error.message
        });
    }
}

export const getAsignacion = async (req, res) => {
    try {
        const asignacion_id = req.params.id;
        const asignacion_id_number = validar_asignacion_id(asignacion_id);

        if (asignacion_id_number !== null) {


            const asignacion = await dbGetAsignacion(asignacion_id_number);

            if (asignacion.success) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Operación realizada exitosamente!',
                    data: asignacion
                });
            } else {
                return res.status(400).json({
                    status: 'error',
                    message: 'no hay asignacion con ese id'
                })
            }


        } else {
            return res.status(400).json({
                status: 'error',
                message: 'El ID ingresado no tiene el formato correcto'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al solicitar la asignación',
            error: error.message
        });
    }
}

export const deleteAsignacion = async (req, res) => {
    try {
        const asignacion_id = req.params.id;
        const asignacion_id_Number = validar_asignacion_id(asignacion_id);
        if (asignacion_id_Number !== null) {
            const asignacion = await dbDeleteAsignacion(asignacion_id_Number)
            if (asignacion.success) {

                return res.status(201).json({
                    status: 'succes',
                    message: `Asignación con ID ${asignacion_id_Number} eliminada correctamente`,
                    data: asignacion
                })
            } else {
                return res.status(400).json({
                    status: 'succes',
                    message: `no se encontro ninguna asignacion con el id ${asignacion_id_Number}`,

                })
            }
        } else {
            return res.status(400).json(
                {
                    status: 'error',
                    message: 'el formato del id es incorrecto'

                }
            )
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'error al borrar la asignacion'
        })
    }
}
export const updateAsignacion = async (req, res) => {
    try {
        const asignacion_id = req.params.id;
        const { empleado_id, proyecto_id, fecha_asignacion, horas_trabajadas } = req.body;
        if (!empleado_id || !proyecto_id || !fecha_asignacion || !horas_trabajadas) {
            return res.status(400).json({
                status: 'error',
                message: '¡Todos los campos son requeridos!'
            })
        }

        const asignacionConDatos = {
            id: asignacion_id,
            empleado_id: empleado_id,
            proyecto_id: proyecto_id,
            fecha_asignacion: fecha_asignacion,
            horas_trabajadas: horas_trabajadas,
        };

        const resultadoActualizacion = await dbUpdateAsignacion(asignacionConDatos);
        if (resultadoActualizacion.success) {
            return res.status(201).json({
                status: 'success',
                message: 'actualizaciion exitosa',
                data: resultadoActualizacion
            }
            )
        }else {
            return res.status(400).json({
                status: 'error',
                message: `no se encontro asignacion con el ID ${asignacion_id}`,
             
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'ocurrio un error al actualizar la asignacion'
        })
    }
}
export const listarAsignaciones = async (req, res) => {
    try {
        const asignaciones = await dbListarAsignaciones();
        if (asignaciones.success) {
            return res.status(201).json({
                status: 'success',
                message: 'se puedo realizar el listado de asignaciones',
                data: asignaciones
            });
        } else {
            return res.status(400).json({
                status: 'error',
                message: '¡no se encontro asignaciones'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrio un error al listar asignaciones',
            error: error.message
        });
    }
}