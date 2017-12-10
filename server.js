"use strict"
// packages
let express = require('express');
let app = express();
let bootstrap = require('jquery');
// console.log('node_modules/');
// app setup
app.set('view engine', 'pug');
app.set('views', './app/views/');
app.use('/images', express.static('./app/images'));
app.use('/jquery', express.static('./node_modules/jquery/dist/'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/'));

// set routes
// app.use('/', express.static('./app/pub/'));
app.use('/', function (req, res) {
    res.render('index');
});

// server start
app.listen(8000);
