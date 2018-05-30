var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var Token = require('./Token');

router.post('/review',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('insert into POIREVIEW (poid,username,review,rate) values(\''+req.body.username+'\',\'' + req.body.poid+'\')') 
        .then(function(response){
                res.status(200).send("user has been save")   
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({ERROR: error})
        })
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send("Token is invalid")
    })    
})



module.exports = router;