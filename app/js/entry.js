const CONST = {
    EVENT: {
        START_UP: "StartUp",
        SPIN_LEFT: "SpinLeft",
        SPIN_RIGHT: "SpinRight",
        SPIN_UP: "SpinUp",
        SPIN_DOWN: "SpinDown"
    }
};

window.$ = require('jquery');
import 'app/sass/style.sass';
const Box = require('./box/box');
const StateMachine = require('./state-machine/state-machine');

const box = new Box();
const stateMachine = new StateMachine(box)