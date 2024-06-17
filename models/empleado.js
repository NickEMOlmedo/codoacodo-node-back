import { pool } from "../config/dbConnection";

export class Empleado {

  constructor(nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo) {

    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fecha_contratacion = fecha_contratacion;
    this.salario = salario;
    this.departamento = departamento;
    this.pais = pais;
    this.cargo = cargo;
  }
}

export const addEmpleado = async (empleado) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      fecha_contratacion,
      salario,
      departamento,
      pais,
      cargo,
    } = empleado;
    const query =
      "INSERT INTO empleados (nombre, apellido, fecha_contratacion, salario, departamento, pais, cargo) VALUES (?,?,?,?,?,?,?)";
    const [results] = await pool.query(query, [nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo]);
   
    if (results.affectedRows === 0) {
      return { success: false };
    } else {
      return { success: true }
    }

  } catch (error) {
    throw error;
  }
};

export const getEmpleado = async (dni) => {

  try {
    const query =
      "SELECT id, nombre, apellido, fecha_contratacion, salario, departamento, pais, cargo FROM empleados WHERE dni = ?"
    const [results] = await pool.query(query, [dni]);

    if (results.length > 0) {
      return { success: true, data: results }; 
    } else {
      return { success: false }; 
    }

  } catch (error) {
    throw error;
  }
};

export const deleteEmpleado = async (dni) => {

  try {
    const query = "DELETE FROM empleados where dni = ?"
    const [results] = await pool.query(query, [dni]);

    if (results.affectedRows === 0) {
      return { success: false };
    } else {
      return { success: true }
    }

  } catch (error) {
    throw error;
  }
}

export const updateEmpleado = async (empleado) => {

  const { id, nombre, apellido, fecha_contratacion, salario, departamento, pais, cargo } = empleado;

  try {
    const query = "UPDATE empleados SET nombre = ?, apellido = ?, fecha_contratacion = ?, salario = ?, departamento = ?, pais = ?, cargo = ? WHERE id = ? ";
    const [results] = await pool.query(query, [nombre, apellido, fecha_contratacion, salario, departamento, pais, cargo, id]);

    if (results.affectedRows === 0) {
      return { success: false };
    } else {
      return { success: true }
    }
    
  } catch (error) {
    throw (error);
  }
}

export const searchEmpleado = async (nombre) => {

  try {
    const query = "SELECT id, nombre, apellido, fecha_contratacion, salario, departamento, pais, cargo FROM empleados WHERE nombre LIKE ?"
    const [results] = await pool.query(query, [`%${nombre}%`]);

    if (results.length > 0) {
      return { success: true, data: results };
    } else {
      return { success: false }; 
    }
  
  } catch (error) {
    throw error;
  }
}


