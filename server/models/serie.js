const moongose = require('mongoose');
const uniqueValidater = require('mongoose-unique-validator');

let Schema = moongose.Schema;
let validateRol = {
    values: ['SUPER_ROLE','ADMIN_ROLE','USER_ROLE'],
    message : '{VALUE} no es un rol valido'
}

let serieSchema = new Schema({
    repeticiones: {
        type: Number,
        required: [true, 'Es obligatorio el numero de repeticiones']
    },
    porcentajeRM: {
        type: Number,
        required: false
    },
    ejercicio:{
        type: Schema.Types.ObjectId, 
        ref: 'Ejercicio'
    }

})

serieSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    //delete userObject.password;
    return userObject;
}

serieSchema.plugin(uniqueValidater,{ message: '{PATH} debe de ser único'});

module.exports = moongose.model('Serie', serieSchema);