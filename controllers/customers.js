const Customers = require('../models/customers')

const createCustomers = (req,res)=>{
    let customer = new Customers({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    customer.save()
     .then(result=>{
         res.status(200).send({message:'customers created: ',data:result})
     })
     .catch(err=>{
         res.send(err) //lempar validasi email unique disini
     })
}

const editCustomer = (req,res)=>{
    let objEdit = {
        email : req.body.email,
        name  : req.body.name,
        password: req.body.password
    }

    Customers.update({"_id":req.params.id},{$set:req.body})
     .then(doc=>{
         res.status(200).send({message:'data udpdated: ',data:doc})
     })
     .catch(err=>{res.send(err)}) //validated error isunique
}

const findAllCutsomers = (req,res)=>{
    
    Customers.find()
     .then(docs=>{
         res.status(200).send({message:'customers data ',data:docs})
     })
     .catch(err=>{
         res.send(err)})
}

const findOneCustomers = (req,res)=>{
    Customers.findOne({'_id':req.params.id})
     .then(doc=>{
         res.status(200).send({message:'single customer data :',data:doc})
     })
     .catch(err=>{res.send(err)})
}

const deleteOneCustomers = (req,res)=>{
     Customers.remove({"_id":req.params.id})
      .then((result)=>{
          res.status(200).send({message:'deleted: ',data:result})
      })
      .catch(err=>{res.send(err)})
}

module.exports = {
    createCustomers,
    editCustomer,
    findAllCutsomers,
    findOneCustomers,
    deleteOneCustomers
}