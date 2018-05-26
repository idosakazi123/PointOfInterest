var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var token = require('./token');

router.get('/ido',function(req, res){
    DButilsAzure.execQuery('select * from poi')
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({ERROR: error})
        })
})

router.get('/random',function(req, res){
    DButilsAzure.execQuery('select top 1 * from poi order by NEWID()')
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

/**
 * how to insert a photo in the azure db
 */
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

module.exports = router;