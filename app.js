var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    middleware = require('./middleware');

// Connection to DB
mongoose.connect(process.env.dburl, function(err, res) {
    if (err) throw err;
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Import Models and controllers
var modelUser = require('./models/users')(app, mongoose);
var modelAuth = require('./models/keys')(app, mongoose);
var modelCiclo = require('./models/ciclos')(app, mongoose);
var modelMinuta = require('./models/minutas')(app, mongoose);
var modelProducto = require('./models/productos')(app, mongoose);

var userCtrl = require('./controllers/users');
var authCtrl = require('./controllers/authenticate');
var cicloCtrl = require('./controllers/ciclos');
var minutaCtrl = require('./controllers/minutas');
var productoCtrl = require('./controllers/productos');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("api is working fine");
});
app.use(router);

// API routes
var routes = express.Router();

routes.route('/users')
    .get(middleware.ensureAuthenticated, userCtrl.findAllUsers)
    .post(middleware.ensureAuthenticated, userCtrl.addUser);

routes.route('/users/:id')
    .get(middleware.ensureAuthenticated, userCtrl.findById)
    .put(middleware.ensureAuthenticated, userCtrl.updateUser)
    .delete(middleware.ensureAuthenticated, userCtrl.deleteUser);

routes.route('/login')
    .post(authCtrl.login);

routes.route('/keys')
    .post(middleware.ensureAuthenticated, authCtrl.addkey);

routes.route('/keys/:id')
    .delete(middleware.ensureAuthenticated, authCtrl.deleteKey);

routes.route('/ciclos')
    .get(middleware.ensureAuthenticated, cicloCtrl.findAllCiclos)
    .post(middleware.ensureAuthenticated, cicloCtrl.addCiclo);

routes.route('/ciclos/:id')
    .get(middleware.ensureAuthenticated, userCtrl.findById)
    .put(middleware.ensureAuthenticated, userCtrl.updateCiclo)
    .delete(middleware.ensureAuthenticated, userCtrl.deleteCiclo);

routes.route('/minutas')
    .get(middleware.ensureAuthenticated, minutaCtrl.findAllMinutas)
    .post(middleware.ensureAuthenticated, minutaCtrl.addMinuta);

routes.route('/minutas/:id')
    .get(middleware.ensureAuthenticated, minutaCtrl.findById)
    .put(middleware.ensureAuthenticated, minutaCtrl.updateMinuta)
    .delete(middleware.ensureAuthenticated, minutaCtrl.deleteMinuta);

routes.route('/productos')
    .get(middleware.ensureAuthenticated, productoCtrl.findAllProductos)
    .post(middleware.ensureAuthenticated, productoCtrl.addProducto);

routes.route('/productos/:id')
    .get(middleware.ensureAuthenticated, productoCtrl.findById)
    .put(middleware.ensureAuthenticated, productoCtrl.updateProducto)
    .delete(middleware.ensureAuthenticated, productoCtrl.deleteProducto);


app.use('/', routes);

// Start server
app.listen(process.env.PORT || 3008, function() {
    console.log("Node server running on http://localhost:3008");
});
