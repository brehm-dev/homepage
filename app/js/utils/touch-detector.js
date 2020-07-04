/**
 * Author: Andreas Brehm <andreasbrehm@live.de>
 **/
const ACTIONS = {
    left: 'left',
    right: 'right'
}
class DetectHelper {
    constructor() {
        // build tools: create
    }
    getTimeStamp() {
        return new Date().getTime()
    }
    detectTarget(target) {
        if (typeof target == 'string') {
            const elem = document.getElementById(target)
            if (elem !== null) {
                return elem
            } else {
                return document.children[0]
            }
        }
    }
    detectDirection(start, end, threshold) {
        const dist = end - start
        if (start < end && dist > threshold) return ACTIONS.left
        if (start > end && dist < threshold) return ACTIONS.right
        return false
    }
}

class TouchDetector {
    constructor(options) {
        this.helper = new DetectHelper()
        this.target = this.helper.detectTarget(options.targetId);
        this.coords = {
            start: {
                x: 0,
                y: 0,
                timestamp: this.helper.getTimeStamp()
            },
            end: {
                x: 0,
                y: 0,
                timestamp: this.helper.getTimeStamp()
            }
        }
        this.threshold = 150
        this.onTouchStart()
        this.onTouchMove()
        this.onTouchEnd(options.cb)
    }
    onTouchStart() {
        this.target.addEventListener('touchstart', (touchEvent) => {
            const touches = touchEvent.changedTouches[0]
            this.coords.start.x = touches.screenX
            this.coords.start.y = touches.screenY
            this.coords.start.timestamp = this.helper.getTimeStamp()
        }, {passive: false})
    }
    onTouchMove() {
        this.target.addEventListener('touchmove', (event) => {
            event.preventDefault()
        }, {passive: false})
    }
    onTouchEnd(callback) {
        this.target.addEventListener('touchend', (touchEvent) => {
            // console.log(touchEvent)
            const touches = touchEvent.changedTouches[0]
            this.coords.end.x = touches.screenX
            this.coords.end.y = touches.screenY
            this.coords.end.timestamp = this.helper.getTimeStamp()
            const action = this.helper.detectDirection(this.coords.start.x, touches.screenX, this.threshold)
            if (typeof action === 'string' && ACTIONS[action] !== undefined) {
                callback(action)
            }
            // if (this.coords.start.x < touches.screenX && (touches.screenX - this.coords.start.x) > this.threshold) {
            //     callback(ACTIONS.left)
            // }
            // if (this.coords.start.x > touches.screenX && (touches.screenX - this.coords.start.x) < this.threshold) {
            //     callback(ACTIONS.right)
            // }
        }, {passive: false})
    }

}

module.exports = TouchDetector