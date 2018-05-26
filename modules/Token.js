var jwt = require('jsonwebtoken');
const superSecret = "breakfast";

exports.makeToken = function(payload){
    var token = jwt.sign(payload, superSecret, {
        expiresIn: "1d"// expires in 24 hours
    });
    return token;
}

exports.checkValidToken = function(req){
    return new Promise(function(resolve,reject){
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err){
                    reject(null);
                }else{
                    var decoded = jwt.decode(token, {complete: true });
                    resolve(decoded);
                }        
            })
        }else{
            reject(null);
        }
    })
}

module.exports = exports;