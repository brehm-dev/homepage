let express = require('express');
let app = express();

app.set('view engine', 'twig');
app.set('views', './app/views/');

app.use('/assets', express.static('./assets'));
app.use('/build', express.static('./build'));


app.use('/', function (req, res) {
    const uAgent = req.headers['user-agent'];
    const isMobile = !!(uAgent.match(/[a-zA-z]+(ablet)/g) || uAgent.match(/[a-zA-z]+(obile)/g));

    res.render('index.html.twig', {
        mobile: isMobile
    });
});

app.listen(8000);
