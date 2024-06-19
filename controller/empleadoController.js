import { Empleado, addEmpleado, getEmpleado, deleteEmpleado, updateEmpleado, searchEmpleado, Empleado } from '../models/empleado';

const empleado = new Empleado();


exports.addEmpleado = async (req, res) => { }

try {

    const { nombre, apellido, dni, fecha_contratacion, salario, departamento, pais, cargo } = req.body;

    const nuevoEmpleado = new Empleado(nombre,apellido,dni,salario,departamento,pais,cargo);

    if (!nombre || !apellido || !dni || !fecha_contratacion || !salario || !departamento || !pais || !cargo) {

        return res.status(400).json({

            stauts: 'fail',
            message: '¡Todos los campos son requeridos!'
        })
    }

    const verificarEmpleado = empleado.getEmpleado(dni);

    if (verificarEmpleado.length() > 0) {

        return res.status(400).json({

            status: 'fail',
            message: '¡El empleado ya existe!'

        })
    }

    const newEmpleado = await empleado.addEmpleado(nuevoEmpleado)

    res.status(201).json({


        
    })

} catch (error) {



}







exports.getEmpleado = async (req, res) => {



}


exports.deleteEmpleado = async (req, res) => {



}

exports.updateEmpleado = async (req, res) => {




}

exports.searchEmpleado = async (req, res) => {




}