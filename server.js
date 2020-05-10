// MODELS IMPORTS
var express = require("express");
var body = require("body-parser");
var cors = require('cors');
// Connection WITH DATABASE
var connection = require("./connection");
// ROUTES
var departments = require('./APIS/department/route');
var products = require('./APIS/product/route');
var productPromotions = require('./APIS/products-promotions/route');
var promotions = require('./APIS/promotions/route');


// CONFIGURATION
var app = express();
app.use(body.urlencoded({ extended: true }));
app.use(cors());
app.use(body.json());
connection();
// APPLICATION ROUTES
departments(app);
products(app);
productPromotions(app);
promotions(app);

var server = app.listen( process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at ", host, port);
});


