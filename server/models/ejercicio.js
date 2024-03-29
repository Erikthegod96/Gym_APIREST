const moongose = require('mongoose');
const uniqueValidater = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let ejercicioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es obligatorio el nombre del ejercicio']
    },
    descripcion: {
        type: String,
    },
    comentarioEntrenador: {
        type: String
    },
    img: {
        type: String,
        required: false
    },
    descanso:{
        type: Number,
        required: true
    },
    orden:{
        type: Number,
    },
    publico:{
        type: Boolean,
        required:true,
        default: false
    },
    sesion:{
        type: Schema.Types.ObjectId, 
        ref: 'Sesion'
    },
    musculo:{
        type: Schema.Types.ObjectId, 
        ref: 'Musculo',
        required: true
    }
})

ejercicioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    return userObject;
}

ejercicioSchema.plugin(uniqueValidater,{ message: '{PATH} debe de ser único'});

module.exports = moongose.model('Ejercicio', ejercicioSchema);