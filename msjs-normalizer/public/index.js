const socket = io();
console.log('Index.js funcionando');

// evento mensajes

socket.on('mensajes', (data)=>{
    console.log(data);

    console.log('Se ejecutó "list-msg-chat"')

    if(data.length <= 0) {
        console.log('No hay mensajes de chat')
        const boardChat = document.getElementById('mensajes');
        boardChat.innerHTML = `<h6> No hay mensajes de chat </h6>`;
    }
    else {
    console.log(data);
    let html = 
    data.map((m)=>`
        <div class="fila">
            <img src="${e.author.avatar}" alt="" width="60" height="60">
            <strong style= "color: blue">${m.mail}</strong>
            <span style= "color: brown"> [ ${m.date} ] </span>
            <em style= "color: green">: ${m.texto}</em>
        </div>
    `).join(' ');
    document.getElementById('mensajes').innerHTML = html;
}
    })

function envioMensaje(f){

    console.log('Funcion envioMensaje')

    let mensaje = {
        author: {
            email: document.getElementById('mail').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('mensaje').value,
        date: new Date().toLocaleString()
    }

    socket.emit('mensajeNuevo', mensaje);

    console.log('Se guardo mensaje en la base de datos', mensaje);

    return false;

}