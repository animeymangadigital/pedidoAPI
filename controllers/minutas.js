//File: controllers/minutas.js
var moment = require('moment');
var mongoose = require('mongoose');
var Minutas = mongoose.model('Minuta');

//GET - Return all Minutas in the DB
exports.findAllMinutas = function(req, res) {
    Minutas.find(function(err, minutas) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(minutas);
    });
};

//GET - Return a Minuta with specified ID
exports.findById = function(req, res) {
    Minutas.findById(req.params.id, function(err, minuta) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(minuta);
    });
};

//POST - Insert a new Minuta in the DB
exports.addMinuta = function(req, res) {
    var minuta = new Minutas({
        title: req.body.title,
        cicloId: req.body.cicloId,
        updated_at: moment()
    });

    minuta.save(function(err, minuta) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(minuta);
    });
};

//PUT - Update a register already exists
exports.updateMinuta = function(req, res) {
    Minutas.findById(req.params.id, function(err, minuta) {
        minuta.title = req.body.title;
        minuta.serieId = req.body.cicloId;
        minuta.updated_at = moment();

        minuta.save(function(err) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });
            res.status(200).jsonp(minuta);
        });
    });
};

//DELETE - Delete a Minuta with specified ID
exports.deleteMinuta = function(req, res) {
    Minutas.findById(req.params.id, function(err, minuta) {
        minuta.remove(function(err) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });
            res.status(200).jsonp({
                message: 'delete'
            });
        })
    });
};
