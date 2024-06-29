import { pool } from "../config/dbConnection.js";


export class Asignacion {
    constructor(empleado_id, proyecto_id, fecha_asignacion, horas_trabajadas) {

        this.empleado_id = empleado_id;
        this.proyecto_id = proyecto_id;
        this.fecha_asignacion = fecha_asignacion;
        this.horas_trabajadas = horas_trabajadas;

    }
}

export const dbAddAsignacion = async (asignacion) => {

    const { empleado_id, proyecto_id, fecha_asignacion, horas_trabajadas } = asignacion;

    try {
        const query = "INSERT INTO asignaciones (empleado_id , proyecto_id, fecha_asignacion, horas_trabajadas) VALUES (?,?,?,?)";
        const [results] = await pool.query(query, [empleado_id, proyecto_id, fecha_asignacion, horas_trabajadas]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw error;
    }
}

export const dbGetAsignacion = async (id) => {

    try {
        const query = "SELECT * FROM asignaciones WHERE id = ?";
        const [results] = await pool.query(query, [id]);

        if (results.length > 0) {
            return { success: true, data: results };
        } else {
            return { success: false };
        }

    } catch (error) {
        throw error;
    }
};

export const dbDeleteAsignacion = async (id) => {

    try {
        const query = "DELETE FROM asignaciones WHERE id = ?"
        const [results] = await pool.query(query, [id]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw (error);
    }
}

export const dbUpdateAsignacion = async (asignacion) => {

    const { empleado_id, proyecto_id, fecha_asignacion, horas_trabajadas } = asignacion;

    try {
        const query = "UPDATE asignaciones SET empleado_id = ?, proyecto_id = ?, fecha_asignacion = ?, horas_trabajadas = ? WHERE id = ?";

        const [results] = await pool.query(query, [empleado_id, proyecto_id, fecha_asignacion, horas_trabajadas, asignacion.id]);
        
        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw (error);
    }
}

export const dbListarAsignaciones_empleado = async (id) => {
    try {
        const query = "SELECT empleado_id, proyecto_id, fecha_inicio, horas_trabajadas FROM asignaciones WHERE empleado_id = ?";
        const [results] = await pool.query(query, [id]); // Usar 'id' en lugar de 'empleado_id'

        if (results.length > 0) {
            return { success: true, data: results };
        } else {
            return { success: false, message: 'No se encontraron asignaciones para este empleado.' }; // Añadir un mensaje explicativo
        }
    } catch (error) {
        throw error;
    }
}
