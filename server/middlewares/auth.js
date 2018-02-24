var jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    jwt.verify(req.headers.token, 'haha', function (err, decoded) {
        console.log('ajaj')
       if(!err){
           console.log('jaj')
           req.headers.userid = decoded._id
           next()
       }else{
           console.log(err)
           res.send(err)
       }
    });
}

module.exports = {auth}


