var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var User = require('./users');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var superSecrest = "hello"

router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
      username : req.body.username,
      password : hashedPassword
    },

    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, superSecrest, {
        expiresIn: "1d" // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });

  router.get('/me', function(req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, superSecrest, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  });


module.exports = router;