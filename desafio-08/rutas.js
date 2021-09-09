import { Producto } from './productos.js'

// creo productos

const escuadra = new Producto("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", 0 );

const calculadora = new Producto("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", 1)


class Rutas{
    constructor(){
        this.productos = [escuadra, calculadora];
        this.listar = '/api/productos' 
        this.productosID = '/api/productos/:id'
        this.guardar = '/api/productos/guardar'
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
}

const rutas = new Rutas()
export default rutas;