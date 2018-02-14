var User = require('../models/users')
var bcrypt = require('bcrypt');
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
                    let token = jwt.sign(payload,'haha')
                    res.status(200).send({message:'welcome,heres your token',token:token,data:doc})
                
            });
        }else{
            res.send('data tidak ada login method disini')
        }
    })
    .catch(err=>{res.status(500).send(err)})
}

module.exports = {
    signIn
}