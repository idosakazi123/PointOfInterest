//this is only an example, handling everything is yours responsibilty !

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var users = require('./users'); // get our users model
var poi = require('./POI')

var cors = require('cors');
app.use(cors());
var DButilsAzure = require('./DButils');


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


app.use('/users',users);
app.use('/reg/poi', poi)

var  superSecret = "SUMsumOpen"; // secret variable


//complete your code here

app.use(function (req, res, next) {

    console.log("server got request");
    next();

});

app.get('/', function (req, res) {
    // var token= req.headers['x-access-token']
    // console.log(tokem);
    res.send({ message: 'hooray! welcome to our api!' });
});    
   
app.get('/userlist', function (req, res){
  DButilsAzure.execQuery("SELECT * FROM users")
    .then(function (response){
        console.log(response);
        res.send(response)
    })

    .catch(function (error){
        console.log(error.message);
    })
}); 

app.delete('/:name', function (req, res) {
    DButilsAzure.execQuery("SELECT * FROM users WHERE name = 'req.params.name' ")
    .then(function (response){
        console.log(response)
        if (response[0].name === req.params.name)
        {
            DButilsAzure.execQuery("DELETE FROM users WHERE name='req.params.name'").
            res.send('User deleted successfully')
        }   
        else
        res.send('No such user exists')
    })

    .catch(function (error){
        console.log(error.message);
    })
    


    
});

app.post('/USERS', function(req, res){
    DButilsAzure.execQuery("SELECT * FROM users")
      .then(function (response){
          console.log(response);
          res.send(response)
      })
  
      .catch(function (error){
          console.log(error.message);
      })
});

app.get('/:id',function(req,res){
    let id = req.params.id
    console.log(id)
    res.send("the requested resource")
});

app.use('/reg', function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, superSecret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // get the decoded payload and header
                var decoded = jwt.decode(token, {complete: true});
                req.decoded= decoded;
                console.log(decoded.header);
                console.log(decoded.payload)
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

})


var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
//-------------------------------------------------------------------------------------------------------------------


