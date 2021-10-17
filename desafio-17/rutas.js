const { Producto } = require("./productos");

// creo productos

const escuadra = new Producto("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");

const calculadora = new Producto("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png")

 let listaProductos = [escuadra, calculadora];


class Rutas{
    constructor(){
        this.listar = '/productos/listar' 
        this.productosID = '/productos/:id'
        this.guardar = '/productos/guardar'
        this.actualizar = '/productos/actualizar/:id'
        this.borrar = '/productos/borrar/:id'
        this.vista = '/productos/vista'
    }
    
    funcionListar = (req, res) => {
        if(listaProductos <= 0) {
            res.send("Error: Productos no encontrados")
        }
        else{
            res.json(listaProductos);
        }
    }
    funcionID = (req, res) => {
        const { id } = req.params;
        const producto = listaProductos.find((producto) => producto.id == id);
        if (producto){
            res.json(producto);
        }
        else {
            res.send("Error: Producto no encontrado");
        }
    }
    funcionGuardar = (req, res) => {
        let body = req.body;
        const nuevoProducto = new Producto (body.title, body.price, body.thumbnail, listaProductos.length);
        listaProductos.push(nuevoProducto);
        // res.status(201).json(nuevoProducto);
        console.log("Nuevo producto agregado: ", nuevoProducto);
        // res.redirect('/');
    }
    funcionActualizar = (req, res) => {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const producto = listaProductos.find((producto) => producto.id == id);
        if (producto) {
            listaProductos[id].title = title;
            listaProductos[id].price = price;
            listaProductos[id].thumbnail = thumbnail;

            console.log('Producto actualizado');
            res.send(`Se ha modificado el producto ${listaProductos[id].title}`);
        }
        else {
            console.log('Producto no encontrado');
            res.send({ error: `No hay producto con el id: ${id}`});
        }
    }
    funcionBorrar = (req, res) => {
        const { id } = req.params;
        const producto = listaProductos.find((producto) => producto.id == id);
        if (producto){
        listaProductos = listaProductos.filter(producto => producto.id != id);
        res.send(`Se ha borrado exitosamente el producto`);
        }
        else {
            res.send("Error: Producto no encontrado");
        }
    }
    funcionVista = (req, res) => {
        if (listaProductos <= 0) {
            console.log("No se encontraron productos");
            const noProductos = { state: true, msg: "No hay productos cargados"}
            res.render('lista', {noProductos})
        } else {
            console.log("Se encontraron productos");
            res.render('lista', { listaProductos } )
            }
        }
}

const rutas = new Rutas()
module.exports = { rutas, listaProductos }