
function numAleatorios(minimo, maximo) {
    return Math.floor((Math.random() * (maximo - minimo + 1 )) + minimo);
}

function numAleatoriosConDecimal(minimo, maximo) {
    return (Math.random() * (maximo - minimo) + minimo).toFixed(2);
}



const http = require('http');

let id = numAleatorios(1, 10);
let title = "Producto " + numAleatorios(1, 10);;
let price = numAleatoriosConDecimal(0, 10000);;
let thumbnail = "Foto " + numAleatorios(1, 10);;

let miObjeto = { id, title, price, thumbnail }

const server = http.createServer((peticion, respuesta)=> {
    respuesta.end(JSON.stringify(miObjeto));
});

const PORT = process.env.port || 3000;

server.listen(PORT, () => {
    console.log('Estoy escuchando en el puerto', PORT);
});