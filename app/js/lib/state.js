const TYPE = {
    INITIAL:    0,
    ACTIVE:     1,
    FINAL:      3
};

class State {
    constructor(target, type, transition) {
        this.target = target;
        this.type = type;
        this.transition = transition;
    }
    getTransition() {
        return this.transition;
    }
    static get TYPE() {
        return TYPE;
    }
}

module.exports = State;