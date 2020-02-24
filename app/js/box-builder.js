const TransitionFactory     = require('./lib/transition-factory');
const EventDispatcher       = require('./lib/event-dispatcher');
const StateMachine          = require('./lib/state-machine');
const StateFactory          = require('./lib/state-factory');
const Box                   = require('./lib/box');

class BoxBuilder {
    constructor(options) {
        this.stateMachine = new StateMachine(
            new Box($(options.box)),
            new StateFactory(),
            new TransitionFactory(),
            new EventDispatcher()
        );
    }
}

module.exports = BoxBuilder;