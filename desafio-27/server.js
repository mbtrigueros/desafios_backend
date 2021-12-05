const express = require('express');
const handlebars = require('express-handlebars');

const fs = require('fs');

const { getConnection } = require('./db/mongoDB.js');

//PASSPORT

const passport = require('passport');

// SESSION

const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

// SERVER

const app = express();
const PORT = 8443;

// HTTP Y SOCKET

const http = require('http').Server(app);
const io = require('socket.io')(http);

//HTTPS 

const https = require('https');

const httpsOptions = {
  key: fs.readFileSync('./sslcert/cert.key'),
  cert: fs.readFileSync('./sslcert/cert.pem')
};

const server = https.createServer(httpsOptions, app).listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`));
server.on("error", (error) => console.log("Server Error\n\t", error));


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

//SESSION

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://mbtrigueros:4ZDWy6iIrVPhowiY@cluster0.ez0kn.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    resave: true,
    rolling: true,
    saveUninitialized: false,
   // cookie: { maxAge: 600000 }
}));

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());
app.use(function (err, req, res, next) {
    console.log(err);
});

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






