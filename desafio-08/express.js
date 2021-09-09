import express from 'express';

import rutas from './rutas.js';


// SERVER

const app = express();
const PORT = 8080;




const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// PROGRAMA

app.get(rutas.listar, rutas.funcionListar);
app.get(rutas.productosID, rutas.funcionID);
app.post(rutas.guardar, rutas.funcionGuardar);

