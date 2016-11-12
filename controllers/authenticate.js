//File: controllers/Authenticate.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Keys = mongoose.model('Key');
var Users = mongoose.model('User');
var Productos = mongoose.model('Producto');
var moment = require('moment');

//POST - Insert a new key in the DB
exports.login = function(req, res) {
    // find the user
    Users.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            return res.status(401).jsonp({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {

            // check if password matches
            bcrypt.compare(req.body.password, user.password, function(err, samePass) {
                if (samePass) {

                    Keys.findOne({
                        code: 'pedido'
                    }, function(err, key) {

                        // if user is found and password is right
                        delete user.password;
                        // create a token

                        var token = jwt.sign(user, key.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });

                        // return the information including token as JSON
                        res.status(200).jsonp({
                            token: token
                        });
                    });
                } else {
                    return res.status(401).jsonp({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }

    });
};

//POST - Insert a new key in the DB
exports.addkey = function(req, res) {

    var key = new Keys({
        secret: bcrypt.hashSync(req.body.secret, bcrypt.genSaltSync(10)),
        code: req.body.code
    });

    key.save(function(err, key) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });

        res.status(200).jsonp(key);
    });
};

//DELETE - Delete a key with specified ID
exports.deleteKey = function(req, res) {
    Keys.findById(req.params.id, function(err, key) {
        key.remove(function(err) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });
            res.status(200);
        })
    });
};
/*
exports.saveProducts = function(req, res) {
    var obj = require("./codebeautify.json");
    obj.forEach(function(product) {
      var producto = new Productos({
          title: product.title,
          de7a12 : product.de7a12,
          de13a17: product.de13a17,
          de18a49: product.de18a49,
          unidad: product.unidad,
          type: product.type,
          minutaId: product.minuta,
          updated_at: moment()
      });

      producto.save(function(err, capitulo) {
          if (err) return res.status(500).jsonp({
              success: false,
              message: err.message
          });
      });
    });

    res.status(200).jsonp({done:'done'});
};*/
