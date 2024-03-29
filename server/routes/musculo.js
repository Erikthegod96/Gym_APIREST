const express = require('express')
const app = express()
const Musculo = require('../models/musculo')
const { verificaToken, verificaRol } = require('../middlewares/authenticate')

//============================
//Muestra todos los musculos
//============================
app.get('/musculos', verificaToken, (req, res) => {
    Musculo.find((err, musculos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            musculos
        })
    })
})

//============================
//Muestra un ejercicio por ID
//============================
app.get('/musculo/:id', verificaToken, (req, res) => {
    Musculo.findById((err, musculo) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            musculo
        })
    })
})


//============================
//Crea un musculo
//============================
app.post('/ejercicio', verificaToken, (req, res) => {
    let body = req.body
    let musculo = new Musculo({
        nombre: body.nombre,
    })
    musculo.save((err, musculoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            musculoDB
        })
    })
})

module.exports = app