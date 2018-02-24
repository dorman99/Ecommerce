var User = require('../models/users')
var bcrypt = require('bcrypt');
var Item  = require('../models/item')
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const signIn = (req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(doc=>{
        if(doc){
            console.log(doc.password)
            bcrypt.compare(req.body.password, doc.password, function (err, result) {
                if(result)
                    var payload = {
                        name:doc.name,
                        email:doc.email,
                        role : doc.role
                    }
                 Item.find()
                  .then(docs=>{
                      if(doc.role == 'admin'){
                        User.find().then(users=>{
                            let token = jwt.sign(payload, 'haha')
                            res.status(200).send({ message: 'welcome,heres your token', token: token, data: doc, dataItems: docs,dataUsers:users })
                        })
                      }else{
                          let token = jwt.sign(payload, 'haha')
                          res.status(200).send({ message: 'welcome,heres your token', token: token, data: doc, dataItems: docs })
                      }
                  })   
                    
                
            });
        }else{
            res.send(null)
        }
    })
    .catch(err=>{res.status(500).send(err)})
}

module.exports = {
    signIn
}