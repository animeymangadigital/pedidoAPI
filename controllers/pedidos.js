//File: controllers/Authenticate.js
var mongoose = require('mongoose');
var Productos = mongoose.model('Producto');
var Minutas = mongoose.model('Minuta');

exports.pedidos = function(req, res) {
  var de7a12 = req.body.de7a12;
  var de13a17 = req.body.de13a17;
  var de18a49 = req.body.de18a49;
  var productosArray = [];
  Minutas.find({
      cicloId: req.body.cicloId
  }, function(err, minutas) {
    minutas.forEach(function(minuta) {
      Productos.find({
          minutaId: minuta._id
      }, function(err, productos) {
        productos.forEach(function(producto) {
          producto.de7a12 = producto.de7a12*de7a12;
          producto.de13a17 = producto.de13a17*de13a17;
          producto.de18a49 = producto.de18a49*de18a49;
          productosArray.push(producto);
        });
      });
    });
    res.status(200).jsonp(productosArray);
  });
};
