let express = require('express');
let app = express();



app.set('view engine', 'twig');
app.set('views', './app/views/');

app.use('/assets', express.static('./assets'));
app.use('/assets/css', express.static('.public/css'));
app.use('/assets/js', express.static('.public/js'));


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
    res.render('index.html.twig', {
        whatsappLink: whatsapp.generate(isMobile),
        thisYear: dateNow.getFullYear()
    });
});

app.listen(8000);
