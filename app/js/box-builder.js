const TransitionFactory     = require('../../../StateMachine/lib/transition-factory');
const EventDispatcher       = require('../../../StateMachine/lib/event-dispatcher');
const StateMachine          = require('../../../StateMachine/lib/state-machine');
const StateFactory          = require('../../../StateMachine/lib/state-factory');
const Box                   = require('../../../StateMachine/lib/box');

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