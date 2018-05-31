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

router.delete('/userpoi',function(req, res){  
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

router.get('/favorite',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('select poi.poid,description,city,country,category,picture from userpoi inner join poi on poi.poid = userpoi.poid where (FAVORITE = 1)') 
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

/**
 * we return a two of favorite poi of user
 */
router.get('/popular',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('select top 2 poi.poid,description,city,country,category,picture from userpoi inner join poi on poi.poid = userpoi.poid where (FAVORITE = 1) order by NEWID()') 
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

router.get('/recent',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('select top 2 poi.poid,description,city,country,category,picture from userpoi inner join poi on poi.poid = userpoi.poid order by timestamp DESC') 
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