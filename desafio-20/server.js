const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');
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


// // ROUTER 

const routerProductos = express.Router();

// // MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routerProductos);

// // IMPORTO LAS RUTAS DESPUES DEL ROUTER 

const { rutas, listaProductos } = require("./rutas");

// // PROGRAMA

routerProductos.get(rutas.listar, rutas.funcionListar);
routerProductos.get(rutas.vista, rutas.funcionVista);
routerProductos.get(rutas.productosID, rutas.funcionID);
routerProductos.post(rutas.guardar, rutas.funcionGuardar);
routerProductos.put(rutas.actualizar, rutas.funcionActualizar);
routerProductos.delete(rutas.borrar, rutas.funcionBorrar);

// MENSAJES

// const mensajes = [  ]

// module.exports = { mensajes }

// RUTA WEBSOCKET

app.get('/websocket', (req,res) => {
    res.render('./layouts/websocket.hbs')
  });
  
  io.on('connection', (socket) => {
  
    console.log(`Usuario conectado ${socket.id}`);

    socket.emit('mensajes', mensajes);
    socket.on('nuevo',(data)=>{
      mensajes.push(data);
      // fs.writeFileSync('chat-historial.txt', JSON.stringify(mensajes), 'utf-8');
      io.sockets.emit('mensajes', mensajes);
    });


    socket.emit('tabla productos', listaProductos);
  
    socket.on('agregar producto', (data) => {
  
      if (listaProductos.length == 0) {
        let nuevoProducto = new Product(
          data.title,
          data.price,
          data.thumbnail,
          listaProductos.length
        );
        listaProductos.push(nuevoProducto);
  
        io.emit('tabla productos', listaProductos);
    
      } else {
        let nuevoProducto = new Producto(
          data.title,
          data.price,
          data.thumbnail,
          listaProductos.length
        );
        listaProductos.push(nuevoProducto);
  
        io.emit('tabla productos', listaProductos);
      }

    });
  
    socket.on('disconnect', () => {
      console.log(`El usuario ${socket.id} se desconectó`);
    });
  
  });