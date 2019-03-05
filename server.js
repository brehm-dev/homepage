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
    let dateNow = new Date();
    let isMobile;
    let whatsapp = {
        number: 491723802411,
        link: {
            mobile: 'https://api',
            desktop: 'https://web'
        },
        generate: function(mobile) {
            let whatsappUrl = '.whatsapp.com/send?phone=';
            if (mobile) {
                return this.link.mobile + whatsappUrl + this.number;
            } else {
                return this.link.desktop + whatsappUrl + this.number;
            }
        }
    };
    let uAgent = req.headers['user-agent'];

    if (uAgent.match(/[a-zA-z]+(ablet)/g) || uAgent.match(/[a-zA-z]+(obile)/g)) {
        isMobile = true;

    } else {
        isMobile = false;
    }
    res.render('index', {
        whatsappLink: whatsapp.generate(isMobile),
        thisYear: dateNow.getFullYear()
    });
});

// server start
app.listen(8000);
