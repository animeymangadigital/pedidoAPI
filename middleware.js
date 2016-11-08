const jwt = require('jsonwebtoken');
var moment = require('moment');

exports.ensureAuthenticated = function(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({
                message: "The security token is missing from your request."
            });
    }
    var mongoose = require('mongoose');
    var Keys = mongoose.model('Key');

    Keys.findOne({
        code: 'pedido'
    }, function(err, key) {
        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, key.secret);

        if (payload.exp <= moment().unix()) {
            return res
                .status(401)
                .send({
                    message: "Token expired"
                });
        }

        req.user = payload.sub;
        next();
    });
}
