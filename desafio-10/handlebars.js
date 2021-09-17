import express from 'express';
import handlebars from 'express-handlebars';


// SERVER

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

// HANDLEBARS

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: "./views/layouts",
        partialsDir: "./views/partials"
    })
);

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas


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
