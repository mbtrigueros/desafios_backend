const express = require('express');
const handlebars = require('express-handlebars');

const { getConnection } = require('./db/mongoDB.js');

// SESSION

const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

// SERVER

const app = express();
const PORT = 8080;

// HTTP Y SOCKET

const http = require('http').Server(app);
const io = require('socket.io')(http);


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

// // MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('./public'));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://mbtrigueros:4ZDWy6iIrVPhowiY@cluster0.ez0kn.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));


const usuarioRouter = require("./routes/rutaUsuario.js");

app.get('/', (_, res) => res.redirect('/mensajes'));

app.use("/usuario", usuarioRouter);

// CONEXION MONGO

getConnection();

// RUTA WEBSOCKET

app.get('/mensajes', (req,res) => {
    res.render('./layouts/websocket.hbs', {userName: req.session.userName})
    const socketConnection = require ('./services/mensajes-normalizer.js');
    socketConnection(io);
    });






