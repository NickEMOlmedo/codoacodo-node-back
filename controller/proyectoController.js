import { Proyecto, addProyecto, getProyecto, deleteProyecto, updateProyecto, searchProyecto } from "../models/proyecto";

exports.addProyecto = async (req, res) => {

    try {
        
        const { nombre, fecha_inicio, presupuesto } = req.body

        if ( !nombre || !fecha_inicio || !presupuesto) {

            return res.status(400).json({

                stauts: 'fail',
                message: '¡Todos los campos son requeridos!'
            })

        }

        const verificarProyecto = await getProyecto(id);

        if (verificarProyecto.success) {

            return res.status(404).json({
                status: 'fail',
                message: '¡El proyecto ya existe!'
            })
        } else {
            const newProyecto = new Proyecto(nombre, fecha_inicio, presupuesto);

            const nuevoProyectoGuardado = await addProyecto(newProyecto);
            
            return res.status(201).json({
                status: 'success',
                message: 'Nuevo proyecto agregado con exito...',
                data: nuevoProyectoGuardado
            })
        }
        
    } catch (error) {
        
        return res.status(500).json({
            status: 'error',
            message: 'Error al añadir el nuevo proyecto',
            error: error.message
        })
    }

}

exports.getProyecto = async (req, res) => {

    try {
        
        const id = req.body;

        if ( typeof(dni) === 'number' && Number.isFinite(id)){

            const proyecto = await.getProyecto(id);

            res.status(201).json({
                status: 'success',
                message: 'Operacion realizada con exito...',
                data: proyecto
            })
        } else {
            res.status(401).json({

                status: 'error',
                message: 'No pudimos encontrar el proyecto, el id es incorrecto'

            })
        }

    } catch (error) {
        
        res.status(500).json({

            status: 'error',
            message: 'Error en la solicitud',
            error: error.message
        })
    }
}