const {options} = require('./options/SQLite3.js');
const knex = require('knex')(options);

// const { mensajes } = require("../server");
const mensajes = [ {"mail": "bel.trigueros@gmail.com", "date": new Date().toLocaleString(), "texto": "Hola!"} ]
const msjPrueba = {"mail": "bel.trigueros@gmail.com", "date": new Date().toLocaleString(), "texto": "Hola otra vez!"}

knex.schema.createTable('mensajes', table => {
    table.string('mail'),
    table.integer('date'),
    table.string('texto')
})
.then(()=>{
    console.log('Tabla de mensajes creada...');
    return knex('mensajes').insert(mensajes);
})
.then(()=>{
    console.log('productos insertados...');
    return knex.from('mensajes').select('*');
})
.then((mensajes)=>{
    console.log('Listando mensajes...');
    for (let mensaje of mensajes) {
        console.log(`${mensaje['mail']} - ${mensaje['date']} -  ${mensaje['texto']}`);
    }
    knex.destroy();
})
.catch(e=>{
    console.log('Error en proceso:', e);
    knex.destroy();
});
