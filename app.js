
const express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const empleadoR = require('./Routes/empleado');
const usaurioR = require('./Routes/usuario');
const clienteR = require('./Routes/cliente');
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

/*app.use('/empleado', empleadoR);
app.use('/usuario', usaurioR);
app.use('/cliente', clienteR);*/

app.use('/person', require('./Routes/person'));
app.use('/intern', require('./Routes/intern'));

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
});