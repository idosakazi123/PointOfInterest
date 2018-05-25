//this is only an example, handling everything is yours responsibilty !

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(cors());
var DButilsAzure = require('./DButils');
var users = require('./users');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users',users);


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




var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
//-------------------------------------------------------------------------------------------------------------------


