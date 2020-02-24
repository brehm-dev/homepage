const CONSTANTS = require('./constants');

class StateMachine {
    constructor(object, stateController, transitionFactory, eventDispatcher) {
        this.object = object;
        this.stateController = stateController;
        this.transitionFactory = transitionFactory;
        this.eventDispatcher = eventDispatcher;
        const States = {};
        for (const page in CONSTANTS.PAGE) {
            if (CONSTANTS.PAGE.hasOwnProperty(page)) {
                const Transition = this.transitionFactory.build(page);
                States[page] = this.stateController.build(
                    page, // position
                    CONSTANTS.SERVICE[page], // service-name
                    Transition.getTransitions() // transition for each side
                );
            }
        }
        console.log(States)
        this.eventDispatcher.addListner(CONSTANTS.ACTION.SPIN.LEFT, () => {

            const executedTransformation = object.spin.left(this.stateController);
        });
        this.eventDispatcher.addListner(CONSTANTS.ACTION.SPIN.RIGHT, () => {
            object.spin.right(this.stateController);
        });
        this.eventDispatcher.addListner(CONSTANTS.ACTION.SPIN.UP, () => {


            console.log(this)
            object.spin.up(this.stateController);
        });
        this.eventDispatcher.addListner(CONSTANTS.ACTION.SPIN.DOWN, () => {
            object.spin.down(this.stateController);
        });


        setTimeout(() => {
            this.triggerEvent(CONSTANTS.ACTION.SPIN.UP);
            // setTimeout(() => {
            //     this.triggerEvent(ACTION.SPIN.UP);
            //     setTimeout(() => {
            //         this.triggerEvent(ACTION.SPIN.UP);
            //         setTimeout(() => {
            //             this.triggerEvent(ACTION.SPIN.UP);
            //             setTimeout(() => {
            //                 this.triggerEvent(ACTION.SPIN.UP);
            //             }, 1000);
            //         }, 1000);
            //
            //     }, 1000);
            //
            // }, 1000);

        }, 2000);


    }
    createEvent(name, callback) {
        return this.eventDispatcher.addListner(name, callback);
    }
    triggerEvent(name) {
        this.eventDispatcher.eventAction(name);
    }
}

module.exports = StateMachine;