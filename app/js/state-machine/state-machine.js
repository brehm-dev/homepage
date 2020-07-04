class StateMachine {
    constructor(object) {
        this.object = object || {}
        this.object.initialize()
        const TAG = this.object.Calibrator.getTags();
        console.log(window)
        window.addEventListener('resize', (event) => {
            this.object.updateResolution()
        })
        if (!this.isTouchScreen()) {
            window.addEventListener('keyup', (event) => {
                event.preventDefault()

                //Key: ArrowLeft - move:left
                if (event.keyCode === 37) {
                    // console.log(this)
                    this.object.move(TAG.DIRECTION.LEFT)
                }
                //Key: ArrowRight
                if (event.keyCode === 39) {
                    this.object.move(TAG.DIRECTION.RIGHT)
                }
            })
        }


    }
    isTouchScreen() {
        try {
            document.createEvent('TouchEvent')
            return true
        } catch (e) {
            alert('no touch')
            // console.error(e)
            return false
        }
    }


}

module.exports = StateMachine;