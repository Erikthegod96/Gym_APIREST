const moongose = require('mongoose');
const uniqueValidater = require('mongoose-unique-validator');

let Schema = moongose.Schema;


let rutinaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es obligatorio el nombre']
    },
    descripcion: {
        type: String,
        required: [true, 'Es obligatoria la descripción']
    },
    estado: {
        type: Boolean,
        required: [true, 'Es obligatorio el estado'],
        default: true
    },
    publica: {
        type: Boolean,
        required: [true, 'Es obligatorio saber si es publica'],
        default: false
    },
    fechaCreacion:{
        type: Date, 
        required: [true, 'Es obligatoria la fecha de creación'],
    },
    usuario:{
        type: Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    usuarioCreador:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Es obligatorio el usuario de creación'],

    }

})

rutinaSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    //delete userObject.password;
    return userObject;
}

rutinaSchema.plugin(uniqueValidater,{ message: '{PATH} debe de ser único'});

module.exports = moongose.model('Rutina', rutinaSchema);