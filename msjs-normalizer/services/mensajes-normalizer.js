//Normalizr
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;


const Mensaje = require("../models/mensajes.js");

const author = new schema.Entity('authors', {}, { idAttribute: 'email' })
const text = new schema.Entity('texts', {
    author: author
}, { idAttribute: '_id' })

function SelectMensajes() {
    Mensaje.find().sort({ 'date': -1 })
        .then(mensajes => {
            const parsedMensajes = mensajes.map(function (m) {
                return {
                    _id: m._id.toString(),
                    author: {
                        email: m.author.email,
                        name: m.author.name,
                        lastName: m.author.lastName,
                        age: m.author.age,
                        alias: m.author.alias,
                        avatar: m.author.avatar
                    },
                    text: m.text,
                    date: m.timeStamp
                };
            })
            const normalizedMsjs = normalize(parsedMensajes, [text]);
            console.log('Longitud antes de normalizar:', JSON.stringify(mensajes).length);
            console.log('Longitud después de normalizar:', JSON.stringify(normalizedMsjs).length);
            socket.emit('mensajes', { mensajes: mensajes, normalizedMsjs: normalizedMsjs });
        })
        .catch(e => {
            console.log('Error getting mensajes: ', e);
        });
}

module.exports = SelectMensajes;