const $ = require('jquery');
window.$ = $;
const Box = require('./box');

import 'app/sass/style.sass';
// import 'fonts/bebas-neue/BebasNeue-Regular.woff';

const box = new Box($('main.box'));
window.Box = box;
