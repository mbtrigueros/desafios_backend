const usuario = require("../controllers/usuarioController.js");
const express = require('express');
const usuarioRouter = express.Router();
const passport = require('passport');


usuarioRouter.post('/login', passport.authenticate('login', {successRedirect: 'http://localhost:8080/mensajes', failureRedirect: '/usuario/failedLogin' }));
usuarioRouter.get('/failedLogin', usuario.failedLogin);
usuarioRouter.get('/register', usuario.registerView);
usuarioRouter.post('/register', passport.authenticate('register', { successRedirect: 'http://localhost:8080/mensajes', failureRedirect: '/usuario/failedRegister'}));
usuarioRouter.get('/failedRegister', usuario.failedRegister);
usuarioRouter.get('/logout', usuario.logout);

module.exports = usuarioRouter;