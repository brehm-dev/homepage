class StateMachine {
    constructor(object) {
        this.object = object || {}
        this.object.initialize()

    }

}

module.exports = StateMachine;