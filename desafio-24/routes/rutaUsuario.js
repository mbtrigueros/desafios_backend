const usuario = require("../controllers/usuarioController.js");
const express = require('express');
const usuarioRouter = express.Router();
// const usuarioTrue = require("../controllers/usuarioController.js");

usuarioRouter.post('/login', usuario.login);
usuarioRouter.get('/logout', usuario.logout);

module.exports = usuarioRouter;