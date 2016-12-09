//File: controllers/ciclos.js
var moment = require('moment');
var mongoose = require('mongoose');
var Ciclos = mongoose.model('Ciclo');

//GET - Return all Ciclos in the DB
exports.findAllCiclos = function(req, res) {
    Ciclos.find(function(err, ciclos) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(ciclos);
    });
};

//GET - Return a Ciclo with specified ID
exports.findById = function(req, res) {
    Ciclos.findById(req.params.id, function(err, ciclo) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(ciclo);
    });
};

//POST - Insert a new Ciclo in the DB
exports.addCiclo = function(req, res) {
    var ciclo = new Ciclos({
        title: req.body.title,
        title_for_excel: req.body.titleForExcel,
        updated_at: moment()
    });

    ciclo.save(function(err, ciclo) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(ciclo);
    });
};

//PUT - Update a register already exists
exports.updateCiclo = function(req, res) {
    Ciclos.findById(req.params.id, function(err, ciclo) {
        ciclo.title = req.body.title;
        ciclo.title_for_excel = req.body.titleForExcel;
        ciclo.updated_at = moment();

        ciclo.save(function(err) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });
            res.status(200).jsonp(ciclo);
        });
    });
};

//DELETE - Delete a Ciclo with specified ID
exports.deleteCiclo = function(req, res) {
    Ciclos.findById(req.params.id, function(err, ciclo) {
        ciclo.remove(function(err) {
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
