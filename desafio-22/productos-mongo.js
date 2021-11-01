import mongoose from 'mongoose';
import { Productos }  from './models/Productos.js';
import { Producto } from './productos.js'


CRUD();


async function CRUD (){
    try {
        const URI = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000
            })    
        console.log('Conectado a la base de datos...');

        const escuadra = new Producto("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");

        const calculadora = new Producto("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png")
        
        let listaProductos = [escuadra, calculadora];

        await Productos.insertMany(listaProductos);
        console.log("Productos cargados: ", listaProductos);

        await mongoose.connection.close();

        } 

    catch(error) {
        throw `Error: ${error}`;
        }

    }
