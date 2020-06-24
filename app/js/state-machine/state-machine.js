const Cacher = require('./cacher');

class StateMachine {
    constructor(object, stateController) {
        this.object = object || {}
        this.stateController = stateController
        this.Cacher = new Cacher();
        // console.log(object.Stage)

        window.addEventListener('spin.left', (event) => {
            console.log(event)
        })
    }

}

module.exports = StateMachine;