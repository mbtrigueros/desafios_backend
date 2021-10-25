const {options} = require('./options/mariaDB');
const knex = require('knex')(options);

const { listaProductos } = require("./rutas");

knex.schema.createTable('listaProductos', table => {
    table.increments('id'),
    table.string('title'),
    table.float('price'),
    table.string('thumbnail')
})
.then(()=>{
    console.log('Tabla de productos creada...');
    return knex('listaProductos').insert(listaProductos);
})
.then(()=>{
    console.log('productos insertados...');
    return knex.from('listaProductos').select('*');
})
.then((listaProductos)=>{
    console.log('Listando productos...');
    for (let producto of listaProductos) {
        console.log(`${producto['id']} - ${producto['title']}. Precio: $${producto['price']} - ${producto['thumbnail']}`);
    }
    return knex.from('listaProductos').where('id', '=', 2).del();
})
.then(()=>{
    console.log('Producto borrado...');
    return knex.from('listaProductos').where('id', '=', 1).update({price: 450});
})
.then(()=>{
    console.log('Producto actualizado...');
    knex.destroy();
})
.catch(e=>{
    console.log('Error en proceso:', e);
    knex.destroy();
});

