const TYPE = {
    INITIAL:    0,
    ACTIVE:     1,
    FINAL:      2
};

class State {
    constructor(options) {
        this.name = options.serviceName;
        this.type = options.type;
        this.transitions = options.transitions;
        for (const key in options.transitions) {
            if (options.transitions.hasOwnProperty(key)) {
                options.transitions[key].stateCallback = () => {
                    this.activate()
                };
            }
        }
    }
    getTransitions() {
        return this.transitions;
    }
    activate() {
        this.type = TYPE.ACTIVE;
        return true;
    }
    initialize() {
        this.type = TYPE.INITIAL;
        return true;
    }
    finalize() {
        this.type = TYPE.FINAL;
        return true;
    }
    static get TYPE() {
        return TYPE;
    }
}

module.exports = State;