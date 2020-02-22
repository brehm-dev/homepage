const ACTION = {
    SPIN: {
        LEFT: 'spin.left',
        RIGHT: 'spin.right',
        UP: 'spin.up',
        DOWN: 'spin.down'
    },
};

class StateMachine {
    constructor(object, states, transitions, eventDispatcher) {
        this.object = object;
        this.states = states;
        this.transitions = transitions;
        this.eventDispatcher = eventDispatcher;
        // this.createEvent()
        console.log(this)

        console.log(states)
        this.eventDispatcher.addListner(ACTION.SPIN.LEFT, () => {
            object.spin.left(this.states);
        });
        // this.eventDispatcher.eventAction(ACTION.SPIN.LEFT);
    }
    createEvent(name, callback) {
        return this.eventDispatcher.addListener(name, callback);
    }
    triggerEvent(name) {
        this.eventDispatcher.eventAction(name);
    }
}

module.exports = StateMachine;