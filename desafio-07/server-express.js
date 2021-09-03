import express from 'express';
import fs from 'fs';


// Variables visitas

let visitas1 = 0;
let visitas2 = 0;

// Variables archivo productos.txt

const arrayProductos =  fs.readFileSync('./productos.txt', 'utf-8');
const arrayJSON = JSON.parse(arrayProductos);
const productosObjeto = {
    items: [...arrayJSON],
    cantidad: arrayJSON.length,
}

// Servidor

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});

server.on('error', error=> console.log('Error en el servidor', error));

// Rutas

app.get('/items', (req,res)=>{


    ++visitas1;

    res.json(productosObjeto);

});

app.get('/item-random', (req, res)=> {

    ++visitas2;

    const azar = Math.floor((Math.random() * productosObjeto.cantidad));
    const numRandom = {
        item: productosObjeto.items[azar]
    }

    res.json(numRandom);

});

app.get('/visitas', (req, res)=> {

    res.send({
        visitas: 
        {
        items: visitas1,
        item: visitas2
        }
    });
});