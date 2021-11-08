const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');
const { getConnection } = require('./db/mongoDB.js');

const { SelectMensajes } = require('./services/mensajes-normalizer.js');

const Mensaje = require("../models/mensajes.js");

// SERVER

const app = express();
const PORT = 8080;

// HTTP Y SOCKET

const http = require('http').Server(app);
const io = require('socket.io')(http);


// const server = app.listen(PORT, ()=>{
//     console.log('Servidor HTTP escuchando en el puerto', server.address().port);
// });
// server.on('error', error=>console.log('Error en servidor', error));

http.listen(8080, () => console.log(`Servidor iniciado en puerto ${PORT}`));

// HANDLEBARS

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "websocket.hbs",
        layoutsDir: "./views/layouts",
        partialsDir: "./views/partials"
    })
);

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas
app.use(express.static('./public'));

// // MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// CONEXION MONGO

getConnection();

// RUTA WEBSOCKET

app.get('/websocket', (req,res) => {
    res.render('./layouts/websocket.hbs')
    });

    io.on('connection', (socket) => {

    console.log(`Usuario conectado ${socket.id}`);

    SelectMensajes();

    });

    socket.on('mensajeNuevo', newMsj => {
        Mensaje.create(newMsj)
            .then(() => {
                console.log('Mensaje insertado');
                SelectMensajes();
                return false;
            })
            .catch(e => {
                console.log('Error en Insert message: ', e);
            });

    });
    
    socket.on('disconnect', () => {
        console.log(`El usuario ${socket.id} se desconectó`);
    });
    





