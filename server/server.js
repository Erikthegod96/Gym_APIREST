require('./config/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Configuración global de rutas
app.use(require('./routes/index'))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URLDB , (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('BBDD connect');
    }
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT)
})