//File: controllers/Authenticate.js
var mongoose = require('mongoose');
var Productos = mongoose.model('Producto');
var Minutas = mongoose.model('Minuta');
const async = require('asyncawait/async');
const awaits = require('asyncawait/await');

exports.pedidos = function (req, res) {
    console.log('-------------------entre-----');
    let send = async((body) => {
        console.log(body);
        var de7a12  = body.de7a12;
        var de13a17 = body.de13a17;
        var de18a49 = body.de18a49;
        var cicloId = body.cicloId;
        var productosArray = [];
        var array = [];
        var minutas = [];


        let minutasList = awaits(Minutas.find());
        minutasList.map((minuta) => {
            minuta['productos'] = [];
            if (String(minuta.cicloId) === String(cicloId)) {
                minutas.push(minuta);
            }
        });

        minutas.forEach(function (minuta) {            
            let productos = awaits(Productos.find({
                minutaId: minuta._id
            }));
            productos.forEach(function (producto) {                
                producto.de7a12 = producto.de7a12 * de7a12;
                producto.de13a17 = producto.de13a17 * de13a17;
                producto.de18a49 = producto.de18a49 * de18a49;
                array.push(producto);
            });
        });

        array.forEach(function (item) {
            var d7a12 = 0;
            var d13a17 = 0;
            var d18a49 = 0;
            var exists = false;
            if (item.unidad === 'kg' || item.unidad === 'lt') {
                d7a12 = item.de7a12 / 1000;
                d13a17 = item.de13a17 / 1000;
                d18a49 = item.de18a49 / 1000;

                for (var prod of productosArray) {
                    if (prod.title.trim() === item.title.trim()) {
                        prod.de7a12 = prod.de7a12 + d7a12;
                        prod.de13a17 = prod.de13a17 + d13a17;
                        prod.de18a49 = prod.de18a49 + d18a49;
                        exists = true;
                        break;
                    }
                }

                if (!exists) {
                    var prod = {
                        title: item.title.trim(),
                        unidad: item.unidad,
                        type: item.type,
                        de7a12: d7a12,
                        de13a17: d13a17,
                        de18a49: d18a49,
                        remain: 0,
                        total: 0
                    }
                    productosArray.push(prod);
                }
            } else {
                if (item.unidad === 'huevo') {
                    d7a12 = item.de7a12 / 55;
                    d13a17 = item.de13a17 / 55;
                    d18a49 = item.de18a49 / 55;

                    for (var prod of productosArray) {
                        if (prod.title.trim() === item.title.trim()) {
                            prod.de7a12 = prod.de7a12 + d7a12;
                            prod.de13a17 = prod.de13a17 + d13a17;
                            prod.de18a49 = prod.de18a49 + d18a49;
                            exists = true;
                            break;
                        }
                    }

                    if (!exists) {
                        var prod = {
                            title: item.title.trim(),
                            unidad: item.unidad,
                            type: item.type,
                            de7a12: d7a12,
                            de13a17: d13a17,
                            de18a49: d18a49,
                            remain: 0,
                            total: 0
                        }
                        productosArray.push(prod);
                    }

                } else {
                    for (var prod of productosArray) {
                        if (prod.title.trim() === item.title.trim()) {
                            prod.de7a12 = prod.de7a12 + item.de7a12;
                            prod.de13a17 = prod.de13a17 + item.de13a17;
                            prod.de18a49 = prod.de18a49 + item.de18a49;
                            exists = true;
                            break;
                        }
                    }

                    if (!exists) {
                        var prod = {
                            title: item.title.trim(),
                            unidad: item.unidad,
                            type: item.type,
                            de7a12: item.de7a12,
                            de13a17: item.de13a17,
                            de18a49: item.de18a49,
                            remain: 0,
                            total: 0
                        }
                        productosArray.push(prod);
                    }
                }
            }
        });

        return productosArray;
    });

    send(req.body)
        .then((productosArray) => {
            res.status(200).jsonp(productosArray);
        });
};