//File: controllers/users.js
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
var mongoose = require('mongoose');
var Users = mongoose.model('User');


//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
    Users.find(function(err, users) {
        if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });
        res.status(200).jsonp(users);
    });
};

//GET - Return a user with specified ID
exports.findById = function(req, res) {
    Users.findById(req.params.id, function(err, user) {
        if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });
        res.status(200).jsonp(user);
    });
};

//POST - Insert a new user in the DB
exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });

        // hash the password along with our new salt
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });

            var user = new Users({
                username: req.body.username,
                password: hash,
                status: req.body.status,
                email: req.body.email,
                name: req.body.name
            });

            user.save(function(err, user) {
                if (err) return res.status(500).jsonp({
                    success: false,
                    message: err.message
                });

                res.status(200).jsonp(user);
            });
        });
    });
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
    Users.findById(req.params.id, function(err, user) {
        user.username = req.body.username;
        user.status = req.body.status;
        user.email = req.body.email;
        user.name = req.body.name;

        user.save(function(err) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });

            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a serie with specified ID
exports.deleteUser = function(req, res) {
    Users.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });

            res.status(200).jsonp({message:'delete'});
        })
    });
};
