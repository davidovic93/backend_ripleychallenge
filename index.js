// requires: librerias a utilizar
var express = require('express');
var mongoose = require('mongoose');

const { dbConnection } = require('./database/config');

// inicializar variables
var app = express();
const cors = require('cors');

//CORS
app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });

//Body parser
// parse application/x-www-form-urlencoded
app.use(express.json());

//Conexión a bd
dbConnection();

// Rutas
app.use('/api/user', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/transferencia',require('./routes/transferencia'));
app.use('/api/destinatario', require('./routes/destinatario'));
app.use('/api', require('./routes/app'));

//Leemos localhost de variables y puerto
const port = process.env.PORT || 3000;

// escuchar peticiones
app.listen(port, () => {
    console.log('Express server corriendo en puerto ' + port + ': \x1b[32m%s\x1b[0m', 'online');
});
