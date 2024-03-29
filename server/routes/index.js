const express = require('express')
const app = express()

app.use(require('./usuario'))
app.use(require('./rutina'))
app.use(require('./login'))
app.use(require('./musculo'))
app.use(require('./sesion'))
app.use(require('./ejercicio'))

module.exports = app
