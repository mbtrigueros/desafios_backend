const { Schema, model } = require('mongoose');
const mensajesCollection = 'mensajes';

const MensajesSchema = new Schema({
    author: {
        email: { type: String, required: true },
        firstName: {type: String, required: true, max: 40},
        lastName: {type: String, required: true, max: 40},
        age: {type: Number, required:true},
        alias: {type: String, required: true, max: 12},
        avatar: {type: String, required: true},
    },
    text: {type: String, required: true, max: 255},
    date: { type: Date, default: Date.now }
})

const modeloMensaje = model(mensajesCollection, MensajesSchema);
module.exports = modeloMensaje;