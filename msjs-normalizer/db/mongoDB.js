const mongoose = require('mongoose');

exports.getConnection = async () => {
    
    try {    
        await mongoose.connect('mongodb://localhost:27017/mongoDBlocal',  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        return `Connection success to mongodb://localhost:27017/mongoDBlocal`

    } catch (error) {
        return `Connection Failed! Error => ${error}`
        
    }
}