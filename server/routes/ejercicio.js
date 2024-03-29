const express = require('express')
const app = express()
const Ejercicio = require('../models/ejercicio')
const { verificaToken, verificaRol } = require('../middlewares/authenticate')

//============================
//Muestra todos los ejercicios
//============================
app.get('/ejercicios', verificaToken, (req, res) => {
    Ejercicio.find((err, ejercicios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            ejercicios
        })
    })
})

//============================
//Muestra un ejercicio por ID
//============================
app.get('/ejercicio/:id', verificaToken, (req, res) => {
    Ejercicio.findById((err, ejercicio) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            ejercicio
        })
    })
})


//========================================
//Muestra todos los ejercicios de una sesion
//========================================
app.get('/ejerciciosSesion/:idSesion', verificaToken, (req, res) => {
    let idSesion = req.params.idSesion
    console.log(idSesion)
    Ejercicio.find({ sesion : idSesion })
        .exec((err, ejercicios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ejercicios
            })
        })
})

//============================
//Crea un ejercicio
//============================
app.post('/ejercicio', verificaToken, (req, res) => {
    let body = req.body
    let ejercicio = new Ejercicio({
        nombre: body.nombre,
        descripcion: body.descripcion,
        img: body.img,
        orden: body.orden,
        descanso: body.descanso,
        sesion: body.idSesion,
        musculo: body.idMusculo
    })
    ejercicio.save((err, ejercicioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            ejercicioDB
        })
    })
})

module.exports = app