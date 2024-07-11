import { pool } from "../config/dbConnection.js";

export class Proyecto {

    constructor(nombre, fecha_inicio, presupuesto) {

        this.nombre = nombre;
        this.fecha_inicio = fecha_inicio;
        this.presupuesto = presupuesto;

    }
};

export const dbAddProyecto = async (proyecto) => {

    const { nombre, fecha_inicio, presupuesto } = proyecto;

    try {
        const query = "INSERT INTO proyectos (nombre, fecha_inicio, presupuesto) VALUES (?,?,?)"
        const [results] = await pool.query(query, [nombre, fecha_inicio, presupuesto]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true, data: results}
        }

    } catch (error) {
        throw (error);
    }
}

export const dbGetProyecto = async (id) => {

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

export const dbListarProyectos = async () => {

    try {
        const query = "SELECT * FROM proyectos"
        const [results] = await pool.query(query);

        if (results.length > 0) {
            return { success: true, data: results }; 
        } else {
            return { success: false };
        }

    } catch (error) {
        throw (error);
    }
}

export const dbDeleteProyecto = async (id) => {

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

export const dbUpdateProyecto = async (proyecto) => {

    const { id, nombre, fecha_inicio, presupuesto } = proyecto;

    try {
        const query = "UPDATE proyectos SET nombre = ?, fecha_inicio = ?, presupuesto = ? WHERE id = ? ";
        const [results] = await pool.query(query, [nombre, fecha_inicio, presupuesto, id]);

        if (results.affectedRows === 0) {
            return { success: false, data: results };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw (error);
    }
}






