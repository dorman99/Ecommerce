const Users = require('../models/users')
var bcrypt = require('bcrypt');
const saltRounds = 10;

const createUsers = (req,res)=>{

    let user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        user.password = hash
        user.save()
            .then(result => {
                res.status(200).send({ message: 'Users created: ', data: result })
            })
            .catch(err => {
                res.send(err) //lempar validasi email unique disini
            })
    });
}


const edituser = (req,res)=>{
    let objEdit = {
        email : req.body.email,
        name  : req.body.name,
        password: req.body.password
    }

    Users.update({"_id":req.params.id},{$set:req.body})
     .then(doc=>{
         res.status(200).send({message:'data udpdated: ',data:doc})
     })
     .catch(err=>{res.send(err)}) //validated error isunique
}

const findAllCutsomers = (req,res)=>{
    
    Users.find()
     .then(docs=>{
         res.status(200).send({message:'Users data ',data:docs})
     })
     .catch(err=>{
         res.send(err)})
}

const findOneUsers = (req,res)=>{
    Users.findOne({'_id':req.params.id})
     .then(doc=>{
         res.status(200).send({message:'single user data :',data:doc})
     })
     .catch(err=>{res.send(err)})
}

const deleteOneUsers = (req,res)=>{
     Users.remove({"_id":req.params.id})
      .then((result)=>{
          res.status(200).send({message:'deleted: ',data:result})
      })
      .catch(err=>{res.send(err)})
}

module.exports = {
    createUsers,
    edituser,
    findAllCutsomers,
    findOneUsers,
    deleteOneUsers
}