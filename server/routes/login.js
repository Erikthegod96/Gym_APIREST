const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')
require('../config/config')

app.post('/login', (req, res) => {
    let body = req.body;
    console.log(body)
    console.log(body.email)
    console.log(body.password)

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                err
            })
        }
        if (!usuarioDB) {
            return res.status(400).json({
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            })
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            })
        }
        let token = jwt.sign(
            { usuario: usuarioDB },
            process.env.SEED,
            { expiresIn: process.env.CADUCIDAD }
        )
        res.json({
            usuario: usuarioDB,
            token

        })
    })
})

module.exports = app