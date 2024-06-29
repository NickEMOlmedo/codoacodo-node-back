import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import empleadosRouter from './routes/empleados.js';
import asignacionesRouter from './routes/asignaciones.js';
import departamentoRouter from './routes/departamentos.js'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/empleados', empleadosRouter);
app.use('/asignaciones', asignacionesRouter);
app.use('/departamentos', departamentoRouter);

app.get('/', (req, res) => {
  res.send('Hola desde index.js');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hubo un error en el servidor.');
});

app.listen(port, () => {
  console.log(`Servidor andando en el puerto ${port}`);
});
