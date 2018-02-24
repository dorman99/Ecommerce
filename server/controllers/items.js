const Item = require('../models/item')

const createItem = (req,res)=>{
    console.log('ini create',req.body)
    let item =  new Item({
        name : req.body.name,
        price: req.body.price,
        img:req.body.img,
        quantity: req.body.quantity,
        category:req.body.category
    })

    item.save()
     .then(doc=>{
         res.status(200).send({message:'item created ',data:doc})
     })
     .catch(err=>{res.send(err)})
}

const findAllItem = (req,res)=>{
    Item.find()
     .then(docs=>{res.status(200).send({message:'heres all items data',data:docs})})
     .catch(err=>{res.send(err)})
}

const findOneItem = (req,res)=>{
    Item.findOne({"_id":req.params.id})
     .then(doc=>{
         res.status(200).send({message:'heres your data single item ',data:doc})
     })
     .catch(err=>{res.send(err)})
}

const editItem = (req,res)=>{
    
    Item.update({"_id":req.params.id},{$set:req.body})
     .then(result=>{
         res.status(200).send({message:'item updated ',data:result})
     })
     .catch(err=>{res.send(err)})
}

const deleteItem = (req,res)=>{
    
    Item.remove({"_id":req.params.id})
     .then(result=>{res.status(200).send({message:'item has been deleted'})})
     .catch(err=>{res.send(err)})
}

module.exports = {
    createItem,
    findAllItem,
    editItem,
    findOneItem,
    deleteItem
}