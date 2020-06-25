class StateMachine {
    constructor(object) {
        this.object = object || {}
        this.object.initialize()

        $(window).on('resize', (event) => {
            this.object.updateResolution()
        })

    }

}

module.exports = StateMachine;