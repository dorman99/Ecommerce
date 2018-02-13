var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var itemsSchema = new Schema({
    name: {type:String,required:true,unique:true},
    harga: Number,
    stocks: {type:Number,default:0},
    category: String
});

itemsSchema.plugin(uniqueValidator);
var Items = mongoose.model('Items', itemsSchema)
module.exports = Items

