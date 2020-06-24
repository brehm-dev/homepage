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
const settings = require('./settings');
const box = new Box($('main.box'));
box.injectSettings(settings)
box.triggerBox(CONST.EVENT.START_UP);
const stateMachine = new StateMachine(box, new StateController())