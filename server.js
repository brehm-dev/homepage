"use strict"
// packages
let express = require('express');
let app = express();

// app setup
app.set('view engine', 'pug');
app.set('views', './app/views/');

app.use('/images', express.static('./public/images'));
app.use('/js', express.static('./public/js'))
app.use('/css', express.static('./public/css'))
app.use('/jquery', express.static('./node_modules/jquery/dist/'));

// set routes

app.use('/', function (req, res) {
    res.render('index');
});

// server start
app.listen(8000);
