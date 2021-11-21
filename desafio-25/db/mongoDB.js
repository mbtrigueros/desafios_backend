const mongoose = require('mongoose');

exports.getConnection = async () => {
    
    try {    
        await mongoose.connect('mongodb+srv://mbtrigueros:4ZDWy6iIrVPhowiY@cluster0.ez0kn.mongodb.net/ecommerce?retryWrites=true&w=majority',  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        return console.log('Te conectaste correctamente a MongoDb');

    } catch (error) {
        return `Connection Failed! Error => ${error}`
        
    }
}