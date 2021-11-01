const socket = io();

/*Evento que escucha el cliente para construir la tabla de productos */
socket.on('tabla productos', (data) => {

    console.log(data.length);

    if(data.length <= 0) {

        const tBody = document.getElementById('tabla__body')
        tBody.innerHTML = `<h4> No hay productos cargados </h4>`

    } else {

        const tBody = document.getElementById('tabla__body')
        tBody.innerHTML = ``;
        data.forEach(data => {
            tBody.innerHTML += `
            <tr id="tabla_row">
            <td>${data.id}</td>
            <td>${data.title}</td>
            <td>${data.price}</td>
            <td><img src="" alt="Imagen" srcset=${data.thumbnail}></td>
            </tr>`
        });
    }
})

function agregarProducto(e) {
    e.preventDefault();
    let titleProducto = document.getElementById('title').value;
    let priceProducto = document.getElementById('price').value;
    let thumbnailProducto = document.getElementById('thumbnail').value;

    let productoAgregado = { 
        title:  titleProducto,
        price:  priceProducto,
        thumbnail: thumbnailProducto,
    }
    // console.log(productoAgregado)
    socket.emit('agregar producto', productoAgregado);
    
    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('thumbnail').value = "";
}

// const btnagregarProducto = document.getElementById("btn__agregarProducto").addEventListener('click', agregarProducto);

// evento mensajes

socket.on('mensajes', (data)=>{
    render(data);
});

let render = (data) => {
    let html = 
    data.map((m)=>`
        <div class="fila">
            <strong style= "color: blue">${m.mail}</strong>
            <span style= "color: brown"> [ ${m.date} ] </span>
            <em style= "color: green">: ${m.texto}</em>
        </div>
    `).join(' ');
    document.getElementById('mensajes').innerHTML = html;
}

function envioMensaje(f){

    let mail = document.getElementById('mail').value;
    let date = new Date().toLocaleString();
    let texto = document.getElementById('mensaje').value;
    if(mail==="") {
        alert('Ingrese un mail')
    } else {
        socket.emit('nuevo', {mail, date, texto});
    }
    return false;
}