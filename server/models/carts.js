var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema ({
    userId : {type: Schema.Types.ObjectId,ref:'Users'},
    items: [{ idItem: {type: Schema.Types.ObjectId, ref: 'Items'},quantity:Number}],
    subtotal: Number,
})

var Carts = mongoose.model('Carts',cartSchema)
module.exports = Carts