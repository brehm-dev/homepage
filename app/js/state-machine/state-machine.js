class StateMachine {
    constructor(object) {
        this.object = object || {}
        this.object.initialize()
        const TAG = this.object.Calibrator.getTags();
        $(window).on('resize', (event) => {
            this.object.updateResolution()
        })
        $(window).on('keyup', (event) => {
            event.preventDefault()
            //Key: ArrowLeft - move:left
            if (event.originalEvent.keyCode === 37) {
                // TODO: Hier sollen die Events gestartet werden.
                this.object.move(TAG.DIRECTION.LEFT)
            }
            //Key: ArrowUp
            if (event.originalEvent.keyCode === 38) {
                this.object.move(TAG.DIRECTION.UP)
            }
            //Key: ArrowRight
            if (event.originalEvent.keyCode === 39) {
                this.object.move(TAG.DIRECTION.RIGHT)
            }
            //Key: ArrowDown
            if (event.originalEvent.keyCode === 40) {
                this.object.move(TAG.DIRECTION.DOWN)
            }
        })
    }

}

module.exports = StateMachine;