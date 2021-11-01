import mongoose from 'mongoose';
const productosCollection = 'productos';

const ProductoEsquema = mongoose.Schema({
    title: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true}
});

export const Productos = mongoose.model(productosCollection, ProductoEsquema);