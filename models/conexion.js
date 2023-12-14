const mongoose = require('mongoose');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const CONNECTION_URL= `mongodb+srv://silciampe:${DB_PASSWORD}@cluster0.ls4myza.mongodb.net/${DB_NAME}`


const conexion = mongoose.connect(CONNECTION_URL);
    
    
conexion.then(() => {
    console.log('Base de datos conectada');
}).catch((err) => {
    console.log(err);
}); 

module.exports = conexion;
