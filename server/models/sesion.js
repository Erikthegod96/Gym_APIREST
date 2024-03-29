const moongose = require('mongoose');
const uniqueValidater = require('mongoose-unique-validator');

let Schema = moongose.Schema;
let validateRol = {
    values: ['SUPER_ROLE','ADMIN_ROLE','USER_ROLE'],
    message : '{VALUE} no es un rol valido'
}

let sesionSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es obligatorio el nombre']
    },
    descripcion: {
        type: String
    },
    dia:{
        type: String
    },
    orden:{
        type: Number
    },    
   
    rutina:{
        type: Schema.Types.ObjectId, 
        ref: 'Rutina'
    }
})

sesionSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    //delete userObject.password;
    return userObject;
}

sesionSchema.plugin(uniqueValidater,{ message: '{PATH} debe de ser único'});

module.exports = moongose.model('Sesion', sesionSchema);