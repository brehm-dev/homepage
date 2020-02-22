class State {
    constructor(options) {
        this.name = options.serviceName;
        this.current = options.name;
        this.history = [this.current];
        this.transitions = options.transitions;
        for (const key in options.transitions) {
            if (options.transitions.hasOwnProperty(key)) {
                options.transitions[key].stateCallback = (direction) => {
                    console.log(direction)
                    this.updateState(direction);
                };
            }
        }
    }
    updateState(newState) {
        this.current = newState;
        this.history.push(this.current);
    }
    getTransitions() {
        return this.transitions;
    }
}

module.exports = State;