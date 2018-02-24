var Cart = require('../models/carts')
var Item = require('../models/item')
const createCart  = (req,res)=>{

    // res.send('masuk sini')
   let cart =  new Cart({
       userId: req.headers.userid,
       subtotal: req.body.subtotal  
   })
   cart.save()
    .then(doc => {
        res.send(doc)
    }) .catch(err => {
        res.send(err)
    })
}

const addItems = (req,res) => {
    let obj = {
        idItem : req.body.itemId,
        quantity : req.body.quantity
    }
    console.log('ini oobj loh',obj)
    Cart.findOne({
        "_id":req.body.cartid
    }).then(doc=>{
        // res.send(doc)
        doc.items.push(obj)
        console.log('ini doc apaaa',doc)
        doc.save()
        Item.findOne({
            "_id":req.body.itemId
        }).then(docitem => {
            
            docitem.quantity -= req.body.quantity
            // res.send(docitem)
            docitem.save()
             .then(result=>{
                 res.send({message:'checkout complete',data:doc})
             }).catch(err=>{res.send(err)})
        }).catch(err => { res.send(err) })

    }).catch(err => { res.send(err) })

}

const all = (req,res)=>{
    Cart.find()
     .then(response => {
         res.send(response)
     }).catch(err=>res.send(err))
}

module.exports = {
    createCart,
    addItems,
    all
}