"use strict"
// packages
let express = require('express');
let app = express();
require('bootstrap');
require('jquery');

// app setup
app.set('view engine', 'pug');
app.set('views', './app/views/');

// set routes
// app.use('/', express.static('./app/pub/'));
app.use('/', function (req, res) {
    res.render('index');
});

// server start
app.listen(8000);
