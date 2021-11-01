import mongoose from 'mongoose';
const mensajesCollection = 'mensajes';

const MensajeEsquema = mongoose.Schema({
    mail: {type: String, require: true},
    date: {type: Date, require: true},
    texto: {type: String, require: true, min: 1, max: 130}
});

export const Mensaje = mongoose.model(mensajesCollection, MensajeEsquema);
