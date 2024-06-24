import { pool } from "../config/dbConnection";

export class Proyecto {

    constructor(nombre, fecha_inicio, presupuesto) {

        this.nombre = nombre;
        this.fecha_inicio = fecha_inicio;
        this.presupuesto = presupuesto;

    }
};

export const addProyecto = async (proyecto) => {

    const { nombre, fecha_inicio, presupuesto } = proyecto;

    try {
        const query = "INSERT INTO proyectos (nombre, fecha_inicio, presupuesto) VALUES (?,?,?)"
        const [results] = await pool.query(query, [nombre, fecha_inicio, presupuesto]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw (error);
    }
}

export const getProyecto = async (id) => {

    try {
        const query = "SELECT * FROM proyectos WHERE id = ?"
        const [results] = await pool.query(query, [id]);

        if (results.length > 0) {
            return { success: true, data: results };
        } else {
            return { success: false };
        }
    } catch (error) {
        throw (error);
    }
}

export const deleteProyecto = async (id) => {

    try {
        const query = "DELETE FROM proyectos WHERE id = ?"
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

export const updateProyecto = async (proyecto) => {

    const { id, nombre, fecha_inicio, presupuesto } = proyecto;

    try {
        const query = "UPDATE proyectos SET nombre = ?, fecha_inicio = ?, presupuesto = ? WHERE id = ? ";
        const [results] = await pool.query(query, [nombre, fecha_inicio, presupuesto, id]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw (error);
    }
}

export const searchProyecto = async (nombre) => {

    try {
        const query = "SELECT id, fecha_inicio,presupuesto FROM proyectos WHERE nombre LIKE ?";
        const [results] = await pool.query(query, [`%${nombre}%`]);

        if (results.length > 0) {
            return { success: true, data: results };
        } else {
            return { success: false };
        }

    } catch (error) {
        throw (error);
    }
}




