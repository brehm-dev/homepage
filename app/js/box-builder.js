const EventDispatcher   = require('./lib/event-dispatcher');
const StateMachine      = require('./lib/state-machine');
const Transition        = require('./lib/transition');
const Constants         = require('./lib/constants');
const State             = require('./lib/state');
const DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down'
};
class Box {
    constructor(box) {
        this.version = '2.9.3';
        this.direction = null;
        this.stage = this.extractProperties(box.parent());
        this.box = this.extractProperties(box);
        this.pages = this.extractBulkProperties(box.children());
        this.tools = {
            transformationString: (c) => {
                if (!c) {
                    if (!c.x || !c.y || !c.z) {
                        throw Error("coordinates x,y,z not found. wrong entry");
                    }
                }
                return `rotateX(${c.x}deg) rotateY(${c.y}deg) translateZ(${c.z}vw)`;
            },
            loop: (states) => {
                const executedTransformations = {};
                for (const page in states) {
                    if (states.hasOwnProperty(page)) {
                        const coordinates = states[page].transitions[this.direction];
                        if (typeof coordinates.stateCallback == 'function') {
                            coordinates.stateCallback(this.direction)
                        }
                        const transformationString = this.tools.transformationString(coordinates);
                        this.pages[page].dom.css('transform', transformationString);
                        executedTransformations[page] = transformationString;
                    }
                }
                return executedTransformations;
            }
        };
        this.spin = {
            left: (states) => {
                this.direction = DIRECTION.LEFT;
                return this.tools.loop(states);
            },
            right: (states) => {
                this.direction = DIRECTION.RIGHT;
                return this.tools.loop(states);
            },
            up: (states) => {
                this.direction = DIRECTION.UP;
                return this.tools.loop(states);
            },
            down: (states) => {
                this.direction = DIRECTION.DOWN;
                return this.tools.loop(states);
            },

        };
        console.log(this)
    }
    extractProperties(data) {
        const name = data.data('alignment');
        const time = Date.now();
        return {
            name: name,
            eventId: Constants.SERVICE[name],
            dom: data,
            timestamp: time
        }
    }
    extractBulkProperties(list) {
        const time = Date.now();
        let result = {};
        for (let e of list) {
            let entry = $(e);
            const name = entry.data('alignment');
            result[name] = {
                eventId: Constants.SERVICE.page[name],
                dom: entry,
                timestamp: time
            }
        }
        return result;
    }
    initialize() {
        const snapShot = $(window);
        const windowSize = {
            x: snapShot.width(),
            y: snapShot.height(),
            z: snapShot.width()
        };
        this.stage.dom.css({
            width: windowSize.x,
            height: windowSize.y,
            perspective: windowSize.x
        });
        this.box.dom.css('transform', `translateZ(-${snapShot.x/2}px)`);
        for (const page in this.pages) {
            this.pages[page].dom.css()
        }
    }
}

class BoxBuilder {
    constructor(options) {
        const BOX = new Box($(options.box));
        this.PageGenerator = new Transition();
        let states = {
            front: new State(this.createStateParam(Constants.PAGES.front)),
            left: new State(this.createStateParam(Constants.PAGES.left)),
            right : new State(this.createStateParam(Constants.PAGES.right)),
            back: new State(this.createStateParam(Constants.PAGES.back)),
            top: new State(this.createStateParam(Constants.PAGES.top)),
            bottom: new State(this.createStateParam(Constants.PAGES.bottom))
        };
        let transitions = {
            front: states.front.getTransitions(),
            left: states.left.getTransitions(),
            right : states.right.getTransitions(),
            back: states.back.getTransitions(),
            top: states.top.getTransitions(),
            bottom: states.bottom.getTransitions()
        };
        const eventDispatcher = new EventDispatcher();
        const PageStateMachine = new StateMachine(BOX, states, transitions, eventDispatcher);
    }
    createStateParam(name) {
        return {
            name: Constants.PAGES[name],
            serviceName: Constants.SERVICE.page[name],
            transitions: this.PageGenerator.next()
        }
    }
}

module.exports = BoxBuilder;