const express = require('express')
const app = express()
const Sesion = require('../models/sesion')
const { verificaToken, verificaRol } = require('../middlewares/authenticate')

//============================
//Muestra todas las sesiones
//============================
app.get('/sesiones', verificaToken, (req, res) => {
    Sesion.find((err, sesiones) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            sesiones
        })
    })
})

//============================
//Muestra una sesion por ID
//============================
app.get('/sesion/:id', verificaToken, (req, res) => {
    Sesion.findById((err, sesion) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            sesion
        })
    })
})


//========================================
//Muestra todas las sesiones de una rutina
//========================================
app.get('/sesionesRutina/:idRutina', verificaToken, (req, res) => {
    let idRutina = req.params.idRutina
    console.log(idRutina)
    Sesion.find({ rutina : idRutina })
        .exec((err, sesiones) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                sesiones
            })
        })
})

//============================
//Crea una sesion
//============================
app.post('/sesion', verificaToken, (req, res) => {
    let body = req.body
    let sesion = new Sesion({
        nombre: body.nombre,
        descripcion: body.descripcion,
        dia: body.dia,
        orden: body.orden,
        rutina: body.idRutina
    })
    sesion.save((err, sesionDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            sesionDB
        })
    })
})

module.exports = app