var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var Token = require('./Token');


router.post('/review',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('insert into POIREVIEW (poid,username,review) values(\''+req.body.poid+'\',\'' + req.body.username+'\',\'' + req.body.review+'\')') 
        .then(function(response){
                res.status(200).send("review has been saved")   
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

router.post('/rate',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('insert into POIRATE (poid,username,rate) values(\''+req.body.poid+'\',\'' + req.body.username+'\',\'' + req.body.rate+'\')') 
        .then(function(response){
                res.status(200).send("rate has been saved")   
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

router.get('/rateAll',function(req, res){  
        DButilsAzure.execQuery('select poi.poid,tableAvg.average,description,city,country,category,picture from poi inner join(select avg(rate) as average, poirate.poid from poirate group by poirate.poid) tableAvg on poi.poid=tableAvg.poid order by average DESC' )
        .then(function(response){
                res.status(200).send(response)   
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({ERROR: error})
        })  
})

module.exports = router;