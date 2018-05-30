var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var cors = require('cors');
app.use(cors());
var DButilsAzure = require('./DButils');


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import modules
var users = require('./modules/users');
var poi = require('./modules/poi');
var userpoi = require('./modules/userpoi');
var poireview = require('./modules/poireview');

app.use('/users', users);
app.use('/poi', poi);
app.use('/userpoi',userpoi);
app.use('/poireview',poireview);

//open connection
const port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

