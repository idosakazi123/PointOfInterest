var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var token = require('./token');


router.get('/random',function(req, res){
    DButilsAzure.execQuery('select top 3 * from poi order by NEWID()')
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({ERROR: error})
        })
})

router.get('/description/:poid',function(req, res){
    var poid = parseInt(req.params.poid)
    DButilsAzure.execQuery('select description from poi where poid = \''+poid+'\'')
        .then(function(response){           
            res.send(response)
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({ERROR: error})
        })
})

router.get('/category/:category',function(req, res){   
    DButilsAzure.execQuery('select poi.poid,name,tableAvg.average,description,city,country,category,picture from poi inner join(select avg(rate) as average, poirate.poid from poirate group by poirate.poid) tableAvg on poi.poid=tableAvg.poid where category=\''+req.params.category+'\' order by average DESC')     
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({ERROR: error})
        })        
})

router.get('/picture/:poid',function(req, res){
    var poid = parseInt(req.params.poid)
    DButilsAzure.execQuery('select picture from poi where poid = \''+poid+'\'')
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({ERROR: error})
        })
})

router.get('/:poid',function(req, res){
    var poid = parseInt(req.params.poid)
    DButilsAzure.execQuery('select * from poi where poid =\''+poid+'\'')
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({ERROR: error})
        })
})

router.get('/',function(req, res){
    DButilsAzure.execQuery('select * from poi')
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({ERROR: error})
        })
})

module.exports = router;