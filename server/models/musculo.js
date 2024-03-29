const moongose = require('mongoose');
const uniqueValidater = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let musculoSchema = new Schema({
    nombre: {
        type: Number,
        required: [true, 'Es obligatorio el numero del musculo']
    }
})

musculoSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    //delete userObject.password;
    return userObject;
}

musculoSchema.plugin(uniqueValidater,{ message: '{PATH} debe de ser único'});

module.exports = moongose.model('Musculo', musculoSchema);