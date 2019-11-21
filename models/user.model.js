const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String},
    password:{type:String},
    games:[{
        id_game: {type:String},
        levels : [{
            niveau:{type:Number},
            nbTentatives:{type:Number},
            isValidate: {type:Boolean,default:false}
        }],
        isAlreadyPlay: {type:Boolean,default:false}
    }]
});

module.exports = mongoose.model('user',UserSchema);