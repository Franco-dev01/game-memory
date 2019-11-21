const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name:{type:String},
    duree:{type:String},
    description:{type:String},
    levels: [Object]
});

module.exports = mongoose.model('game',GameSchema);