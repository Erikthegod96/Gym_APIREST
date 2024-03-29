const express = require('express')
const app = express()
const Rutina = require('../models/rutina')
const { verificaToken, verificaRol } = require('../middlewares/authenticate')

//============================
//Muestra todas las rutinas
//============================
app.get('/rutinas', verificaToken, (req, res) => {
    Rutina.find((err, rutinas) => {
        if (err) {
            return res.status(400).json({
                message: err.message
            })
        }
        res.json({
            rutinas
        })
    })
})

//============================
//Muestra una rutina por ID
//============================
app.get('/rutina/:id', verificaToken, (req, res) => {
    Rutina.findById((err, rutina) => {
        if (err) {
            return res.status(400).json({
                message:err.message
            })
        }
        res.json({
            rutina
        })
    })
})


//=======================================
//Muestra todas las rutinas de un usuario
//=======================================
app.get('/rutinasUsuario/:idUsuario', verificaToken, (req, res) => {
    let idUsuario = req.params.idUsuario
    Rutina.find({ usuario : idUsuario })
        .exec((err, rutinas) => {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            console.log(rutinas)
            res.json({
                rutinas : rutinas
            })
        })
})

//============================
//Crea una rutina
//============================
app.post('/rutina', verificaToken, (req, res) => {
    let body = req.body
    let rutina = new Rutina({
        nombre: body.nombre,
        descripcion: body.descripcion,
        publica: body.publica,
        estado: body.estado,
        fechaCreacion: new Date(),
        usuario: body.usuario,
        usuarioCreador: req.usuario._id
    })
    rutina.save((err, rutinaDB) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        res.json({
            rutina:rutinaDB
        })
    })
})

module.exports = app