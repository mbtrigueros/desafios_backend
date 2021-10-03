"use strict";
var express = require('express');
var handlebars = require('express-handlebars');
var fs = require('fs');
// SERVER
var app = express();
var PORT = 8080;
// HTTP Y SOCKET
var http = require('http').Server(app);
var io = require('socket.io')(http);
// const server = app.listen(PORT, ()=>{
//     console.log('Servidor HTTP escuchando en el puerto', server.address().port);
// });
// server.on('error', error=>console.log('Error en servidor', error));
http.listen(8080, function () { return console.log("Servidor iniciado en puerto " + PORT); });
// HANDLEBARS
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "websocket.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials"
}));
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas
app.use(express.static('./public'));
// // ROUTER 
var routerProductos = express.Router();
// // MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routerProductos);
// // IMPORTO LAS RUTAS DESPUES DEL ROUTER 
var Producto = require("./productos").Producto;
var _a = require("./rutas"), rutas = _a.rutas, listaProductos = _a.listaProductos;
// // PROGRAMA
routerProductos.get(rutas.listar, rutas.funcionListar);
routerProductos.get(rutas.vista, rutas.funcionVista);
routerProductos.get(rutas.productosID, rutas.funcionID);
routerProductos.post(rutas.guardar, rutas.funcionGuardar);
routerProductos.put(rutas.actualizar, rutas.funcionActualizar);
routerProductos.delete(rutas.borrar, rutas.funcionBorrar);
// MENSAJES
var mensajes = [];
// RUTA WEBSOCKET
app.get('/websocket', function (req, res) {
    res.render('./layouts/websocket.hbs');
});
io.on('connection', function (socket) {
    console.log("Usuario conectado " + socket.id);
    socket.emit('mensajes', mensajes);
    socket.on('nuevo', function (data) {
        mensajes.push(data);
        fs.writeFileSync('chat-historial.txt', JSON.stringify(mensajes), 'utf-8');
        io.sockets.emit('mensajes', mensajes);
    });
    socket.emit('tabla productos', listaProductos);
    socket.on('agregar producto', function (data) {
        if (listaProductos.length == 0) {
            var nuevoProducto = new Producto(data.title, data.price, data.thumbnail, listaProductos.length);
            listaProductos.push(nuevoProducto);
            io.sockets.emit('tabla productos', listaProductos);
        }
        else {
            var nuevoProducto = new Producto(data.title, data.price, data.thumbnail, listaProductos.length);
            listaProductos.push(nuevoProducto);
            io.sockets.emit('tabla productos', listaProductos);
        }
    });
    socket.on('disconnect', function () {
        console.log("El usuario " + socket.id + " se desconect\u00F3");
    });
});
