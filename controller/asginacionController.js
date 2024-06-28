import { Asignacion, dbAddAsignacion, dbGetAsignacion, dbDeleteAsignacion, dbUpdateAsignacion, bdListarAsignaciones_empleado, dbListarAsignaciones_empleado } from "../models/asignacion.js";
import { dbGetEmpleado } from "../models/empleado.js";




 const validar_asignacion_id=(empleado_id)=>{
    if (typeof empleado_id === 'string' && empleado_id.trim()!=='') {
        const empleado_id_nuber = Number(empleado_id);
        return Number.isFinite(empleado_id_nuber)? empleado_id_nuber:null
    }
 }



export const addAsignacion=async (req,res)=>{
    try {
        const {
            empleado_id, proyecto_id, fecha_asignacion,  horas_trabajadas}=req.body
        if (!empleado_id|| !proyecto_id || !fecha_asignacion || !horas_trabajadas) {
            return res.status(400).json({
                status:'fail',
                message:'todos los campos son requeridos!'
            })
        }
        const verificarEmpleado=await dbGetAsignacion(empleado_id)
        if (verificarEmpleado.success) {
            return res.status(400).json({
                status:'fail',
                message :'el empleado ya existe'
            })
        }else{
            const newAsignacion=new Asignacion(empleado_id, proyecto_id, fecha_asignacion,  horas_trabajadas);
            const nuevaAsignacionguardado=await dbAddAsignacion(newAsignacion);
            return res.status(201).json({
                status:'succes',
                message:'empleado añadido con exito!',
                data: nuevaAsignacionguardado
            })
         }
    } catch (error) {
        return res.satus(500).json({
            status:'error',
            message:'error al añadir el nuevo empleado',
            error:message.error
        })
    }
}
export const getAsignacion=async(req,res)=>{
    try {
        const {asignacion_id}=req.body

        const asignacion_id_Number=validar_asignacion_id(asignacion_id)
        if (asignacion_id_Number !==null) {
            const asignacion =await dbGetEmpleado(asignacion_id_Number)
            return res.status(201).json({
                status: 'success',
                message: 'operacion realizada exitosamente!',
                data:asignacion
            })
        }
        else{
            return res.status(400).json({
                status:'error',
                message:'el Id ingresado no tiene el dformato correcto'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:'error',
            message:'error al solicitar el empleado',
            error:message.error
        })
    }
}
export const deleteAsignacion=async(req,res)=>{
    try {
        const {asignacion_id}=req.body
        const asignacion_id_Number=validar_asignacion_id(asignacion_id)
        if (asignacion_id_Number!==null) {
            const asignacion= await dbDeleteAsignacion(asignacion_id_Number)
            return res.status(201).json({
                status:'succes',
                message:'asignacion borrada con exito!',
                data:asignacion
            })
        } else{
            return res.status(400).json(
                {
                    status:'error',
                    message:'el formato del id es incorrecto'

                }
            )
        }
    } catch (error) {
        return res.status(500).json({
            status:'error',
            message:'error al borrar la asignacion'   
             })
    }
}
export const updateAsignacion=async(req,res)=>{
    try {
        const {empleado_id}=req.params
        const empleado_id_nuber=validar_asignacion_id(empleado_id)
        if (empleado_id_nuber!==null) {
            const asignacion=await dbUpdateAsignacion(empleado_id_nuber)
            if (asignacion.success) {
                return res.status(201).json({
                    status:"succes",
                    message:'asignacion actualizada con exito',
                    data:asignacion

                })
            }else{
                return res.status(500).json({
                    status:'error',
                    message:'no se pudo actualizar la asignacion',
                    error:message.error
                    
                })
            }
        }else{
            return res.status(400).json({
                status:'error',
                message:'la id no tenia formato correcto'
            })
        }

    } catch (error) {
        return res.status(500).json({
            status:'error',
            message:'ocurrio un error al actualizar la asignacion'
        })
    }
} 
export const listarAsignaciones_empleado=async (req,res)=>{
    try {
        const {empleado_id} = req.params;
        const empleado_id_number = validarDni(empleado_id);

        if (empleado_id_number !== null) {

            const empleado = await dbListarAsignaciones_empleado(empleado_id_number);
    
            return res.status(201).json({
                status: 'success',
                message: 'se puedo realizar el listado de asignaciones',
                data: empleado
            });
        } else {
            
            return res.status(400).json({
                status: 'error',
                message: '¡El ID no tiene el formato correcto!'
            });
        }
    } catch (error) {
        
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrio un error al listar asignaciones',
            error: message.error
        });
    }
}