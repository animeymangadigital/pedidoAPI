//File: controllers/productos.js
var moment = require('moment');
var mongoose = require('mongoose');
var Productos = mongoose.model('Producto');

//GET - Return all Productos in the DB
exports.findAllProductos = function(req, res) {
    Productos.find(function(err, productos) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(productos);
    });
};

//GET - Return a Producto with specified ID
exports.findById = function(req, res) {
    Productos.findById(req.params.id, function(err, producto) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(producto);
    });
};

//POST - Insert a new producto in the DB
exports.addProducto = function(req, res) {
    var producto = new Productos({
        title: req.body.title,
        de7a12 : req.body.de7a12,
        de13a17: req.body.de13a17,
        de18a49: req.body.de18a49,
        unidad: req.body.unidad,
        minutaId: req.body.minutaId,
        updated_at: moment()
    });

    producto.save(function(err, capitulo) {
        if (err) return res.status(500).jsonp({
            success: false,
            message: err.message
        });
        res.status(200).jsonp(producto);
    });
};

//PUT - Update a register already exists
exports.updateProducto = function(req, res) {
    Productos.findById(req.params.id, function(err, producto) {
        producto.title = req.body.title;
        producto.de7a12 = req.body.de7a12;
        producto.de13a17 = req.body.de13a17;
        producto.de18a49 = req.body.de18a49;
        producto.unidad = req.body.unidad;
        producto.minutaId = req.body.minutaId;
        producto.updated_at = moment();

        producto.save(function(err) {
            if (err) return res.status(500).jsonp({
                success: false,
                message: err.message
            });
            res.status(200).jsonp(producto);
        });
    });
};

//DELETE - Delete a producto with specified ID
exports.deleteProducto = function(req, res) {
    Productos.findById(req.params.id, function(err, producto) {
        producto.remove(function(err) {
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
