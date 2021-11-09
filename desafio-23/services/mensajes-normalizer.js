//Normalizr
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const schema = normalizr.schema;



const Mensaje = require("../models/mensajes.js");

const author = new schema.Entity('authors', {}, { idAttribute: 'email' })
const text = new schema.Entity('texts', {
    author: author
}, { idAttribute: '_id' })

module.exports = (io) => {
    io.on('connection', (socket) => {

    console.log(`Usuario conectado ${socket.id}`);

    function SelectMensajes() {
        Mensaje.find()
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
                        date: m.date
                    };
                })
                const normalizedMsjs = normalize(parsedMensajes, [text]);
                const longAntes = JSON.stringify(mensajes).length;
                const longDesp = JSON.stringify(normalizedMsjs).length;
                console.log('Longitud antes de normalizar:', longAntes);
                console.log('Longitud después de normalizar:', longDesp);
                const porcentaje = Math.trunc((1 - (longDesp / longAntes)) * 100);
                console.log(porcentaje);
                socket.emit('mensajes', { mensajes: mensajes, compresion: porcentaje, normalizedMsjs: normalizedMsjs });
            })
            .catch(e => {
                console.log('Error: ', e);
            });
    }

    

    SelectMensajes();


    socket.on('mensajeNuevo', newMsj => {
        Mensaje.create(newMsj)
            .then(() => {
                console.log('Mensaje insertado');
                SelectMensajes();
                return false;
            })
            .catch(e => {
                console.log('Error al insertar mensaje ', e);
            });

    });
    
    socket.on('disconnect', () => {
        console.log(`El usuario ${socket.id} se desconectó`);
    });

});

return io

}


