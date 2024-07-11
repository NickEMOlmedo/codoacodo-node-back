import { pool } from "../config/dbConnection.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Clave secreta para JWT
const secretJWT = 'hola';

// Modelo de usuario
export class Usuario {
    constructor (username, password) {
        this.username = username;
        this.password = password;
    }
}

// Registrar un nuevo usuario
export const dbRegisterUser = async (user) => {
    const { username, password } = user;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO usuario (username, password) VALUES (?,?)";
        const [results] = await pool.query(query, [username, hashedPassword]);

        if (results.affectedRows === 0) {
            return { success: false };
        } else {
            return { success: true, data: results };
        }
    } catch (error) {
        throw (error);
    }
}

// Iniciar sesion de usuario
export const dbLoginUser = async (username, password) => {
    try {
        const query = "SELECT * FROM usuario WHERE username = ?";
        const [results] = await pool.query(query, [username]);

        if (results.length > 0) {
            const user = results[0];

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(isPasswordValid) {
                const token = jwt.sign({ 
                    id: user.id, 
                    username: user.username
                },
                secretJWT, {
                    expiresIn: '1h'
                });

                return {success: true, token};;
            } else {
                return {success: false, message: 'Usuario y/o contraseña incorrectos'};
            }
        } else {
            return { success: false, message: 'Usuario no encontrado'}
        }

    } catch (error) {
        throw error
    }
}

// Verificar token JWT
export const verificarToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretJWT);
        return {success: true, data: decoded};
    } catch (error) {
        return { success: false, message: 'Token invalido'};
    }
}