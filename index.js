import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import JsonWebToken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

//Routes
import empleadosRouter from './routes/empleados.js';
import asignacionesRouter from './routes/asignaciones.js';
import departamentoRouter from './routes/departamentos.js'; 
import proyectosRouter from './routes/proyectos.js'; 
import usuariosRouter from './routes/usuarios.js'


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/empleados', empleadosRouter);
app.use('/asignaciones', asignacionesRouter);
app.use('/departamentos', departamentoRouter);
app.use('/proyectos', proyectosRouter);
app.use('/usuarios', usuariosRouter);

app.get('/', (req, res) => {
  res.send('Hola desde index.js');
});

//Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hubo un error en el servidor.');
});

app.listen(port, () => {
  console.log(`Servidor andando en el puerto ${port}`);
});
