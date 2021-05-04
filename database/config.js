const mongoose = require('mongoose');

//variables de entorno local
require('dotenv').config({path: '.env'});

const dbConnection = async() => {

    try {
        console.log('url db',process.env.DB_URL);
        await mongoose.connect( process.env.DB_URL , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
        
    } catch (error) {
        console.log('error: ',error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}


module.exports = {
    dbConnection
}