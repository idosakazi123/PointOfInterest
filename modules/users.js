var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var Token = require('./Token');

/**
 * make user category
 * make a function that make a for on user category and insert it to usercategory table
 */
router.post('/register', function(req,res){
    DButilsAzure.execQuery('insert into users(username,password,firstname,lastname,city,country,email,answer) values (\''+req.body.username+'\',\'' + req.body.password+'\',\''+req.body.firstname+'\',\''+req.body.lastname+'\',\''+req.body.city+'\',\''+req.body.country+'\',\''+req.body.email+'\',\''+req.body.answer+'\')')
    .then(function (response){
        //write a function to insert list of category to userin table
        DButilsAzure.execQuery('insert into usercategory(username,category) values (\''+req.body.username+'\',\''+req.body.category+'\')')
        .then(function (nextResponse){
            console.log(response);
            res.sendStatus(200)
        })
        .catch(function (error){
            console.log(error.message);
        })         
    })
    .catch(function (error){
        console.log(error.message);
    })
})

router.post('/retrivalPassword', function(req,res){
    var userName = req.body.username;  
    var answer = req.body.answer;
    DButilsAzure.execQuery('select password from users where username =\''+userName+'\' and answer =\''+answer+'\'')
    .then(function (response){
        if(response[0] != undefined){
            res.status(200).send(response[0])
        }else{
            res.send({"ERROR":"The answer that you give is not match"})
        }
    })
    .catch(function (error){
        console.log(error)
        res.status(500).send({ERROR: error})
    })
})

router.post('/login',function(req,res){
    var userName = req.body.username
    var password = req.body.password
    DButilsAzure.execQuery('select username from users where username = \''+userName+'\' and password = \''+password+'\'')
    .then(function(response){
        if(response[0] != undefined){
            var payload = {
                userName : userName
            }
            var token = Token.makeToken(payload)
            res.send({"Your token": token})
        }else{
            res.status(500).send({ERROR: 'User name or paswword is not correct'})
        }
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send({ERROR: error})
    })
})

router.post('/details',function(req,res){
    var userName = req.body.username
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('select username,firstname,lastname,city,country,email from users where username = \''+userName+'\'') 
        .then(function(response){
                res.send(response)   
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