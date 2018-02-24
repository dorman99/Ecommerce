var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var usersSchema = new Schema({
    name    :String,
    email   :{type:String,unique:true},
    password:String,
    role    : {type: String, default:'customer'}
});

usersSchema.plugin(uniqueValidator);
var Users = mongoose.model('Users',usersSchema)
module.exports = Users

