var Cart = require('../models/carts')

const createCart  = (req,res)=>{
    let cart  = new Cart({
        userId:req.headers.userId,
        items:req.body.items
    })
    cart.save()
     .then(doc=>{
         res.send(doc)
     })
     .catch(err=>{
         res.send(err)
     })
}

module.exports = {
    createCart
}