import 'dotenv/config';
import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT;

app.use(express.json());
// app.use(express.static(path.join(__dirname), 'public'))

import empleadosRouter from './routes/empleados.js';

app.use('/empleados', empleadosRouter);

app.get('/', (req, res) => {
  res.send('Hola desde index.js')
})

app.listen(port, () => {
  console.log(`Servidor Andando en el puerto ${port}`);
});



