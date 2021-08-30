const fs = require('fs')

class Archivo {
    constructor(archivo){
        this.archivo = archivo;
        this.formato = "utf8";
    }

    async leer(){
        try {
            const data = await fs.promises.readFile(this.archivo, this.formato)
            const dataObjeto = JSON.parse(data);
            console.log(dataObjeto);
            return dataObjeto;
        }
        catch(error){
            console.log("Hubo un error", error);
        }
    }
    
    async guardar(nuevoProducto){
        try{
            const arrayProductos = await fs.promises.readFile(this.archivo, this.formato)
            const arrayObjeto = JSON.parse(arrayProductos);

            let arrayLength = arrayObjeto.length + 1;

            const nuevoProduct = {
                ...nuevoProducto, 
                id: arrayLength
            }

            const nuevoArray = [...arrayObjeto, nuevoProduct]
            await fs.promises.writeFile('productos.txt', JSON.stringify(nuevoArray, null, '\t'))
            
        }
        catch(error){
            console.log("Hubo un error", error);
        }

    }

    async borrar(){
        try{ 
            await fs.promises.unlink(this.archivo);
            console.log('El archivo fue eliminado');

        }
        catch(error){
            console.log('Hubo un error', error);
        }
    }

}

class Producto {
    constructor(name, price, thumbnail){
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const archivoProducto = new Archivo('productos.txt');

archivoProducto.leer();
// // archivoProducto.borrar();

const nuevo = new Producto("Libro", 250, "www.google.com");

archivoProducto.guardar(nuevo);






