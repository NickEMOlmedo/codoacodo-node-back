require("dotenv").config();
const port = process.env.PUERTO;
const express = require("express");

const app = express();

app.listen(port, () => {
  console.log(`Servidor Andando en el puerto ${port}`);
});
