var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    
    NumEtudiant:String,
    firstName:String,
    lastName:String,
    cycle:Number,
    adresse:{
        num:Number,
        rue:String,
        ville:String,
        pays:String
    },
    email:[{type:String}],
    cours:[{
        code:String,
        titre:String,
        description:String,
        credit:Number
    }]
})
module.exports = mongoose.model('ColEtu', userSchema); 