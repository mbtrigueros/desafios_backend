const socket = io();
console.log('Index.js funcionando');

// evento mensajes

socket.on('mensajes', (data) => renderMensajes(data));

let renderMensajes = (data) => {

    console.log('Entro historial de mensajes')

    if(data.mensajes.length <= 0) {
        console.log('No hay mensajes de chat')
        const boardChat = document.getElementById('mensajes');
        boardChat.innerHTML = `<h4> No hay mensajes de chat </h4>`;
    }
    else {
    let html = 
    data.mensajes.map((m)=>`
        <div class="fila">
            <strong style= "color: blue">${m.author.alias}</strong>
            <span style= "color: brown"> [ ${m.date} ] </span>
            <em style= "color: green">: ${m.text}</em>
            <img src="${m.author.avatar}" alt="" width="60" height="60">
        </div>
    `).join(' ');
    document.getElementById('mensajes').innerHTML = html;
    document.getElementById('porcentaje').innerHTML = `<h3>${data.compresion}%</h3>`;
}

}

function envioMensaje(f){

    console.log('Funcion envioMensaje esta funcionando')

    let mensaje = {
        author: {
            email: document.getElementById('mail').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('text').value,
        date: new Date().toLocaleString()
    }

    socket.emit('mensajeNuevo', mensaje);

    console.log('Se guardo mensaje en la base de datos', mensaje);

    return false;

}
