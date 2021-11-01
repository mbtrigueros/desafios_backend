import mongoose from 'mongoose';
import { Mensaje }  from './models/Mensajes.js';

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

        let mensajesArray = [
            { mail: "bel.trigueros@gmail.com", date: new Date().toLocaleString(), texto: "Hola!" },
            { mail: "bel.trigueros@gmail.com", date: new Date().toLocaleString(), texto: "Hola otra vez!" }
        ] 

        await Mensaje.insertMany(mensajesArray);
        console.log("Mensajes grabados: ", mensajesArray);

        await mongoose.connection.close();

        } 

    catch(error) {
        throw `Error: ${error}`;
        }

    }
