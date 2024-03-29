const moongose = require('mongoose');
const uniqueValidater = require('mongoose-unique-validator');

let Schema = moongose.Schema;
let validateRol = {
    values: ['SUPER_ROLE','ADMIN_ROLE','USER_ROLE','ENTRENADOR_ROLE'],
    message : '{VALUE} no es un rol valido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es obligatorio el nombre']
    },
    apellidos: {
        type: String,
        required: [true, 'Son obligatorios los apellidos']
    },
    email:{
        type: String,
        required: [true, 'Es obligatorio el email']
    },
    password: {
        type: String,
        required: [true, 'Es obligatoria el número']
    },
    numero: {
        type: Number,
        required: [true, 'Es obligatoria el número']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'Es obligatoria la edad']
    },
    altura: {
        type: Number,
        required: [true, 'Es obligatoria la altura']
    },
    pesoInicial:{
        type: Number,
        required: [true, 'Es obligatoria la altura']
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        required: [true, 'Es obligatorio el estado'],
        default: true
    },
    publico: {
        type: Boolean,
        default: false
    },
    rol:{
        type: String,
        default: 'USER_ROLE',
        enum: validateRol
    },
    entrenador:{
        type: Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    fechaCreacion:{
        type: Date
    },
    rutinaActiva:{
        type: Schema.Types.ObjectId, 
        ref: 'Rutina'
    }

})

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidater,{ message: '{PATH} debe de ser único'});

module.exports = moongose.model('Usuario', usuarioSchema);