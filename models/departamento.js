import e from "express";
import { pool } from "../config/dbConnection.js";

export class Departamento {

    constructor(nombre, ubicacion) {

        this.nombre = nombre;
        this.ubicacion = ubicacion;

    }
}

export const dbAddDepartamento = async (departamento) => {

    const { nombre, ubicacion } = departamento;

    try {
        const query = "INSERT INTO departamentos (nombre, ubicacion) VALUES (?,?)";
        const [results] = await pool.query(query, [nombre, ubicacion]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw error;
    }
}

export const dbListarDepartamentos = async () => {

    try {
        const query = "SELECT * FROM departamentos";
        const [results] = await pool.query(query);

        if (results.length > 0) {
            return { success: true, data: results };
        } else {
            return { success: false };
        };
    } catch (error) {
        throw error;
    }
}

export const dbGetDepartamentoById = async (id) => {

    try {
        const query = "SELECT * FROM departamentos WHERE id = ?";
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

export const dbDeleteDepartamento = async (id) => {

    try {

            const query = "DELETE FROM departamentos WHERE id = ?"
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

export const dbUpdateDepartamento = async (departamento) => {

    const { id, nombre, ubicacion } = departamento;

    try {
        const query = "UPDATE departamentos SET nombre = ?, ubicacion = ? WHERE id = ? ";
        const [results] = await pool.query(query, [nombre, ubicacion, id]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true }
        }

    } catch (error) {
        throw (error);
    }
}











