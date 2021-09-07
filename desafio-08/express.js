import express from 'express';

// PRODUCTOS 

class Producto {
    constructor(title, price, thumbnail, id){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
}

const escuadra = new Producto("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", 0 );

const calculadora = new Producto("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", 1)

const productos = [escuadra, calculadora];

// SERVER

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// PROGRAMA

// Devuelvo lista de productos. Si no hay productos, devuelvo error.

app.get('/api/productos', (req,res)=>{
    if(productos <= 0) {
        res.send("Error: Productos no encontrados")
    }
    else{
        res.json(productos);
    }
});

// Devuelvo producto con el id indicado en los params. Si el mismo no existe, devuelvo error.

app.get('/api/productos/:id', (req,res)=>{
    let params = req.params;
    const { id } = params;
    const producto = productos.find((producto) => producto.id == id);
    if (producto){
        res.json(producto);
    }
    else {
        res.send("Error: Producto no encontrado");
    }
});

// Agrego un nuevo producto a productos.

app.post('/api/productos/guardar', (req,res)=>{
    let body = req.body;
    const nuevoProducto = new Producto (body.title, body.price, body.thumbnail, productos.length);
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
    console.log("Nuevo producto agregado: ", nuevoProducto);
});