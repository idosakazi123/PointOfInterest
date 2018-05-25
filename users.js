module.exports = function (userName,password,firstName,lastName,city,country,email,answer){
    this.userName = userName
    this.password = age
    this.firstName = firstName
    this.lastName = lastName
    this.city = city 
    this.country = country 
    this.email = email
    this.answer = answer
}

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var AuthController = require('./AuthController');
router.use('/AuthController', AuthController);


var payload = { userName : 'ido', password : 'idossss'}
var superSecrest = "hello"
var token = jwt.sign(payload,superSecrest,{expiresIn:"1d"})
res.json({
    succes: true,
    message: 'enjoy your token',
    token : token
    
});


router.get('/',function(req,res){
    res.send('GET handler for /users route');
    next();
});
router.post('/',function(req,res){
    res.send('POST handler for /users route');
});

//Register
router.post('/Register',function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        jwt.verify(token, app.get('suprSecret'),function (err,decoded){
            if(err){
                return res.json({success: false, message: ' Failed to authenticate token.'})
            }else{
                var decoded = jwt.decoded(token, {complete:true});
                req.decoded = decoded;
                DButilsAzure.execQuery("SELECT * FROM users")
                    .then(function (response){
                        console.log(response);
                        res.send(response)
                    })

                    .catch(function (error){
                        console.log(error.message);
                    })
            }
        });
    }else{
        console.log(token);
        console.log("token is no good");
    }

    res.send('POST handler for /users/regiser route');
});

//Retrival Password 
router.post('/Password',function(req,res){
    res.send('GET handler for /users route');
});

//LogIn

router.post('/LogIn',function(req,res){
    res.send('GET handler for /users route');
});

//User Details

router.post('/Details',function(req,res){
    res.send('GET handler for /users route');
});

//

module.exports = router;
