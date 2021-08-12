function Usuario (nombre, apellido, mascotas, libros){
    this.nombre = nombre || "";
    this.apellido = apellido || "";
    this.mascotas = mascotas || [];
    this.libros = libros || [];

}

Usuario.prototype.getFullName = function () {
    return `${this.nombre} ${this.apellido}`;
};

Usuario.prototype.addMascota = function (mascota) {
    this.mascotas.push(mascota);
};

Usuario.prototype.getMascotas = function () {
    return this.mascotas.length;
};

Usuario.prototype.addBook = function (book, autor) {
    this.libros.push({nombre: book, autor: autor});
};

Usuario.prototype.getBooks = function () {
    return this.libros.map((libro) => libro.nombre);
};

let usuario = new Usuario('Maria Belen', 'Trigueros', ["Gato"], [({nombre:"Bestiario", autor: "Julio Cortazar"})]);


console.log(usuario.getFullName());
usuario.addMascota("Perro");
console.log(usuario.getMascotas());
usuario.addBook("El Aleph", "J.L. Borges");
usuario.addBook("Blade Runner", "Philip Dick");
console.log(usuario.getBooks());
