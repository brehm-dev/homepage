class StateMachine {
    constructor(object) {
        this.object = object || {}
        this.object.initialize()
        this.object.updateResolution()

    }

}

module.exports = StateMachine;