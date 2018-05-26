var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var Token = require('./Token');

router.get('/saveuserpoi/:username/:poid',function(req, res){
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