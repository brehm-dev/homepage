const template = require('./index.html.twig');

const images = {
    logo: {
        src: require('../../assets/images/my_logo_clear.png'),
        alt: 'Logo'
    },
    favicon: {
        src: require('../../assets/images/1512913768.ico'),
        alt: 'favicon'
    }
}

module.exports = template(images);