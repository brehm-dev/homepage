const Cache = require('./cache');
const CONSTANTS = require('./constants');
const EventDispatcher = require('./event-dispatcher');

const ACTION = {
    SPIN: {
        LEFT: 'spin.left',
        RIGHT: 'spin.right',
        UP: 'spin.up',
        DOWN: 'spin.down'
    }
};

class AbstractStateMachine {
    constructor(object, states, transitions, eventDispatcher) {
        this.cache = new Cache();
        this.object = object;
        this.states = states;
        this.transitions = transitions;
        this.eventDispatcher = new EventDispatcher();


    }
}

class StateMachine extends AbstractStateMachine {
    constructor(object, states, transitions, eventDispatcher) {
        super(object, states, transitions, eventDispatcher)

        this.eventDispatcher.addListner(ACTION.SPIN.LEFT, () => {
            console.log(this.transitions[CONSTANTS.PAGES.front])
            const oldCoords = object.spinLeft();
        });
        const prevEventDataId = this.cache.insert({
            name: ACTION.SPIN.LEFT,
            state: states,
            object: object,
            states: states,
            transitions: transitions
        });
        this.eventDispatcher.eventAction(ACTION.SPIN.LEFT);
        // this.
        // console.log()
    }
}

module.exports = StateMachine;