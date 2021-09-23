import express from 'express';
import pug from 'pug';


// SERVER

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

// PUG

app.set("view engine", "pug");

app.set("views", "./views"); // registra el motor de plantillas


// ROUTER 

const routerProductos = express.Router();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routerProductos);
app.use(express.static('public'));

// IMPORTO LAS RUTAS DESPUES DEL ROUTER 

import rutas from './rutas.js';

// PROGRAMA

routerProductos.get(rutas.listar, rutas.funcionListar);
routerProductos.get(rutas.vista, rutas.funcionVista);
routerProductos.get(rutas.productosID, rutas.funcionID);
routerProductos.post(rutas.guardar, rutas.funcionGuardar);
routerProductos.put(rutas.actualizar, rutas.funcionActualizar);
routerProductos.delete(rutas.borrar, rutas.funcionBorrar);
