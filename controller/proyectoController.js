import { Proyecto, dbAddProyecto, dbGetProyecto, dbListarProyectos, dbUpdateProyecto, dbDeleteProyecto, dbSearchProyecto} from "../models/proyecto.js";

const validarId = (id) => {
    if( typeof id === 'string' && id.trim() !== '') {
        const idNumber = parseInt(id, 10);
        return Number.isFinite(idNumber) ? idNumber : null;
    } 
    return null;
}


export const addProyecto = async (req, res) => {

    try {
        
        const { nombre, fecha_inicio, presupuesto } = req.body

        if ( !nombre || !fecha_inicio || !presupuesto) {

            return res.status(400).json({
                status: 'fail',
                message: '¡Todos los campos son requeridos!'
            });

        }

        const verificarProyecto = await dbGetProyecto();

        if (verificarProyecto.success) {

            return res.status(404).json({
                status: 'fail',
                message: '¡El proyecto ya existe!'
            });
        } else {
            const newProyecto = new Proyecto(nombre, fecha_inicio, presupuesto);
            const nuevoProyectoGuardado = await dbAddProyecto(newProyecto);
            
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

export const getProyecto = async (req, res) => {

    try {
        
        const { id } = req.params;
        const idNumber = validarId(id);

        if ( idNumber !== null ){

            const proyecto = await dbGetProyecto(idNumber);
        
            if (proyecto) {
                res.status(200).json({
                    status: 'success',
                    message: 'Operacion realizada con exito...',
                    data: proyecto
                })
            } else {
                return res.status(404).json({
                    status: 'error',
                    message: 'No pudimos encontrar el proyecto con ese id'
                })
            }
        }
        else {
            res.status(400).json({

                status: 'error',
                message: 'El id no es valido'

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

export const listarProyectos = async (req, res) => {

    try {
        const proyectos = await dbListarProyectos();

        if(proyectos) {
            return res.status(200).json({
                status: 'success',
                message: 'Proyectos encontrados',
                data: proyectos
            })
        } else {
            return res.status(404).json({
                status: 'success',
                message: 'Proyectos NO encontrados'
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

export const deleteProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = validarId(id);

        if (idNumber !== null) {
            const resultado = await dbDeleteProyecto(idNumber);

            if (resultado.success) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Proyecto eliminado con éxito'
                });
            } else {
                return res.status(404).json({
                    status: 'fail',
                    message: 'No pudimos encontrar el proyecto con ese ID'
                });
            }
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'El ID no tiene el formato correcto'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error en la solicitud',
            error: error.message
        });
    }
}


export const updateProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, fecha_inicio, presupuesto } = req.body;
        const proyecto = new Proyecto(nombre, fecha_inicio, presupuesto);
        proyecto.id = id;

        const resultado = await dbUpdateProyecto(proyecto);

        if (resultado.success) {
            return res.status(200).json({
                status: 'success',
                message: '¡Proyecto actualizado con éxito!'
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: '¡Proyecto no encontrado!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el proyecto',
            error: error.message
        });
    }
};

