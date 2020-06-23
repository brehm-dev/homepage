const Cacher = require('./cacher');

class StateMachine {
    constructor(object, stateController, transitionFactory, eventDispatcher) {
        this.cacher = new Cacher();
    }
}

module.exports = StateMachine;