var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var Token = require('./Token');



router.post('/saveuserpoi',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('insert into USERPOI (username,poid) values(\''+req.body.username+'\',\'' + req.body.poid+'\')') 
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

router.post('/deleteuserpoi',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('delete from USERPOI where (username = \''+req.body.username+'\'and poid = \'' + req.body.poid+'\')' ) 
        .then(function(response){
                res.status(200).send("poid has been deleted")   
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

/**
 * the get method is not work well we need to know how we get or sent the token in get method
 */
router.get('/',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('select * from  userpoid') 
        .then(function(response){
                res.status(200).send(response)   
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