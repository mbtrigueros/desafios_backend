import { Producto } from './productos.js'

// creo productos

const escuadra = new Producto("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", 0 );

const calculadora = new Producto("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", 1)


class Rutas{
    constructor(){
        this.productos = [escuadra, calculadora];
        this.listar = '/productos/listar' 
        this.productosID = '/productos/:id'
        this.guardar = '/productos/guardar'
        this.actualizar = '/productos/actualizar/:id'
        this.borrar = '/productos/borrar/:id'
    }
    
    funcionListar = (req, res) => {
        if(rutas.productos <= 0) {
            res.send("Error: Productos no encontrados")
        }
        else{
            res.json(rutas.productos);
        }
    }
    funcionID = (req, res) => {
        const { id } = req.params;
        const producto = rutas.productos.find((producto) => producto.id == id);
        if (producto){
            res.json(producto);
        }
        else {
            res.send("Error: Producto no encontrado");
        }
    }
    funcionGuardar = (req, res) => {
        let body = req.body;
        const nuevoProducto = new Producto (body.title, body.price, body.thumbnail, rutas.productos.length);
        rutas.productos.push(nuevoProducto);
        res.status(201).json(nuevoProducto);
        console.log("Nuevo producto agregado: ", nuevoProducto);
    }
    funcionActualizar = (req, res) => {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const producto = rutas.productos.find((producto) => producto.id == id);
        if (producto) {
            rutas.productos[id].title = title;
            rutas.productos[id].price = price;
            rutas.productos[id].thumbnail = thumbnail;

            console.log('Producto actualizado');
            res.send(`Se ha modificado el producto ${rutas.productos[id].title}`);
        }
        else {
            console.log('Producto no encontrado');
            res.send({ error: `No hay producto con el id: ${id}`});
        }
    }
    funcionBorrar = (req, res) => {
        const { id } = req.params;
        rutas.productos = rutas.productos.filter(producto => producto.id != id);
        res.send(`Se ha borrado exitosamente el producto`);
    }
}

const rutas = new Rutas()
export default rutas;