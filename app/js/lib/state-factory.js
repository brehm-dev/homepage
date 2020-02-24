class State {
    constructor(position, serviceName, transitions) {
        this.serviceName = serviceName;
        this.position = position;
        this.transitions = transitions;
        this.history = [this.position];
    }
    updateState(newState) {
        this.position = newState;
        this.history.push(this.position);
    }
    importTransitions(transitions) {
        if (!this.transitions) {
            this.transitions = transitions;
        }
    }
    setPosition(position) {
        this.position = position;
    }
}

class StateFactory {
    constructor() {
    }
    build(position, serviceName, transitions) {
        return new State(
            position,
            serviceName,
            transitions
        );
    }
}

module.exports = StateFactory;