const mongoose = require('mongoose');

exports.getConnection = async () => {
    
    try {    
        await mongoose.connect('mongodb://localhost:27017/mongoDBlocal',  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        return console.log('Te conectaste correctamente a MongoDb');

    } catch (error) {
        return `Connection Failed! Error => ${error}`
        
    }
}