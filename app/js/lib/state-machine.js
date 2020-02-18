// const Cache = require('./cache');


class AbstractStateMachine {
    constructor(object, states, transitions, eventDispatcher) {
        this.object = object;
        this.states = states;
        this.transitions = transitions;
        this.evetDispatcher = eventDispatcher;
    }
}

class StateMachine extends AbstractStateMachine {
    constructor(object, states, transitions, eventDispatcher) {
        super(object, states, transitions, eventDispatcher)
    }
    static generateStateMachine(object, states, transitions, eventDispatcher) {
        const stateMachine = new this(object, states, transitions, eventDispatcher);
        console.log(stateMachine);
    }

    static get ACTION() {
        return COLLECTION.ACTION;
    }

    static get ID() {
        return COLLECTION.ID;
    }

    static get UNIT() {
        return COLLECTION.UNIT;
    }

    static get TOKEN() {
        return COLLECTION.TOKEN;
    }

    static get SLUG() {
        return COLLECTION.SLUG;
    }

    static get STATE() {
        return COLLECTION.STATE;
    }
}

module.exports = StateMachine;