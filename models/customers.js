var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var customersSchema = new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
});

customersSchema.plugin(uniqueValidator);
var Customers = mongoose.model('Customers',customersSchema)
module.exports = Customers

