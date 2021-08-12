class Usuario{

    constructor(nombre, apellido, mascotas, libros){
        this.nombre = nombre || "";
        this.apellido = apellido || "";
        this.mascotas = mascotas || [];
        this.libros = libros || [];
    }

    getFullName = () => {
        return `${this.nombre} ${this.apellido}`;
    }
    
    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    }

    getMascotas = () => {
        return this.mascotas.length;
    }

    addBook = (book, autor) => {
        this.libros.push({nombre: book, autor: autor});
    }

    getBooks = () => {
        return this.libros.map((libro) => libro.nombre);
    }

}

let usuario = new Usuario ('Maria Belen', 'Trigueros', [], []);

console.log(usuario.getFullName());
usuario.addMascota("Perro");
usuario.addMascota("Gato");
console.log(usuario.getMascotas());
usuario.addBook("Vigilar y Castigar", "M. Foucault");
usuario.addBook("A sangre fria", "Truman Capote");
console.log(usuario.getBooks());