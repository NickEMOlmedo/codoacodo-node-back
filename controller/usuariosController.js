// FUNCIONES PARA EL LOGIN Y REGISTRO DE USUARIOS 
// CON JSONWEBTOKEN Y BCRYPTJS

import pkg from 'jsonwebtoken';
const { verify } = pkg;

import { Usuario, dbRegisterUser, dbLoginUser, verificarToken } from "../models/usuarios.js";

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Todos los campos son requeridos'
            });
        }

        const user = new Usuario(username, password);
        const result = await dbRegisterUser(user);

        if (result.success) {
            return res.status(201).json({
                status: 'success',
                message: 'Usuario registrado con exito'
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Erroral registrar el usuario'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrio un error al registrar el usuario',
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Todos los campos son requeridos'
            })
        }

        const result = await dbLoginUser(username, password);
        
        if (result.success) {
            return res.status(200).json({
                status: 'success',
                message: 'Inicio de sesion exitoso',
                token: result.token
            })
        } else {
            return res.status(401).json({
                status: 'fail',
                message: result.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error al iniciar sesión',
            error: error.message
        });
    }
};

export const verifiarUsuarioToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'No token'
        });
    }

    const result = verificarToken(token);

    if(result.success) {
        req.user = result.data;
        next();
    } else {
        return res.status(401).json({
            status: 'fail',
            message: result.message
        });
    }
}
