const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const jwt = require('jsonwebtoken')
const { verificaToken, verificaRol } = require('../middlewares/authenticate')

//============================
//Muestra todas los usuarios
//============================
app.get('/usuarios',(req,res) => {
    Usuario.find((err,usuarios) =>{
        if (err) {
            console.log("GET /usuarios KO " + err)
            return res.status(400).json({
                err:{
                    message : err,
                    codigo : 400
                }
            })
        }
        console.log("GET /usuarios OK")
        res.status(200).json({
            usuarios
        })
    })
})

//============================
//Muestra un usuario por ID
//============================
app.get('/usuarioId/:id',(req,res) => {
    console.log("un usuario")
    let id = req.params.id
    Usuario.findById(id,(err,usuario) =>{
        if (err) {
            return res.status(400).json({
                err:{
                    message:err,
                    codigo:400
                }
            })
        }
        res.status(200).json({
            usuario
        })
    })
})

//============================
//Muestra un usuario por email
//============================
app.get('/usuarioEmail/:email',verificaToken,(req,res) => {
    let email = req.params.email
    Usuario.find({email: email}).
    exec((err,usuario) =>{
        if (err) {
            return res.status(400).json({
                err:{
                    message:err,
                    codigo:400
                }
            })
        }
        res.json({
            usuario
        })
    })
})

//====================================================================================
//Muestra los usuarios que tienen al usuario que hace la petición como entrenador
//====================================================================================
app.get('/usuariosClientes',[verificaToken],(req,res) => {
    let idUser = req.usuario._id
    console.log(idUser)
    Usuario.find({entrenador: idUser}).
    exec((err,usuarios) =>{
        console.log(usuarios)
        if (err) {
            return res.status(400).json({
                err:{
                    message:err,
                    codigo:400
                }
            })
        }
        res.json({
            usuarios
        })
    })
})

//============================
//Crea un usuario
//============================
app.post('/usuario',(req,res) => {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        numero: body.numero,
        fechaNacimiento: body.fechaNacimiento,
        altura: body.altura,
        pesoInicial: body.pesoInicial,
        estado: body.estado,
        publico: body.publico,
        rol:body.rol,
        fechaCreacion: new Date()
    })
    usuario.save((err, usuarioDB) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                err:{
                    message: err.message
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

app.put('/usuario/:id', [verificaToken, verificaRol], function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'numero', 'img','estado','publico','entrenador']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                err:{
                    message:err
                }
            })
        }
        res.json({
            usuario: usuarioDB
        });
    })

})


module.exports = app