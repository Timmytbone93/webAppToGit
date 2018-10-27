var jwt = require('jsonwebtoken');
var config = require('../Config/config');

var createToken = function (auth) {
    return jwt.sign({
            _id:auth._id,
            //google_id: auth.google_id,
            fullName: auth.fullName,
            firstName: auth.firstName,
            lastName: auth.lastName,
            email: auth.email
        }, config.googleApi.client_key,
        {
            expiresIn: 60 * 60
        });
};

module.exports = {
    generateToken: function (req, res, next) {
        req.token = createToken(req.auth);
        next();


    },
    sendToken: function (req, res) {
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send();
    },
    verifyToken: function (req, res) {
        jwt.verify(req.token, config.googleApi.client_key, function (err, decoded) {
            if (err) {
                return res.status(401).send("Token Expired");
            }
            if (Date.now() > decoded.exp) {
                return res.status(200).send(decoded);
            } else {
                return res.status(401).send("Token Expired");
            }
        });
    }
};


