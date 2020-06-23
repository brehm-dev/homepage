const $ = require('jquery');
window.$ = $;
import 'app/sass/style.sass';
const Box = require('./box');
const StateMachine = require('./state-machine/state-machine');
const StateController = require('./state-machine/state-controller');
const box = new Box($('main.box'));
// const BoxStateMachine = new StateMachine(
//     box,
//     new StateController(),
//
// );
window.Box = box;
