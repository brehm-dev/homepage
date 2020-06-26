window.$ = require('jquery');
import 'app/sass/style.sass';
const Box = require('./box/box');
const StateMachine = require('./state-machine/state-machine');

const box = new Box();
const stateMachine = new StateMachine(box)