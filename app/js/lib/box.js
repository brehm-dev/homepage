const CONSTANTS = require('./constants');

class Box {
    constructor(box) {
        this.version = '2.9.3';
        this.currentAction = null;
        this.stage = this.extractProperties(box.parent());
        this.box = this.extractProperties(box);
        this.pages = this.extractBulkProperties(box.children());
        const snapShot = $(window);
        this.settings = {
            windowSize: {
                x: snapShot.width(),
                y: snapShot.height(),
                z: snapShot.width()/2
            }
        };

        this.tools = {
            transformationString: (c) => {
                if (!c) {
                    if (!c.x || !c.y || !c.z) {
                        throw Error("coordinates x,y,z not found. wrong entry");
                    }
                }
                return `rotateX(${c.x}deg) rotateY(${c.y}deg) translateZ(${c.z}px)`;
            },
            loop: (states) => {
                const executedTransformations = {};
                console.log(states)
                for (const page in states) {
                    if (states.hasOwnProperty(page)) {
                        const coordinates = states[page].transitions[this.currentAction];
                        // console.log(coordinates)
                        if (typeof coordinates.stateCallback == 'function') {
                            coordinates.stateCallback(this.currentAction)
                        }
                        const transformationString = this.tools.transformationString(coordinates);
                        console.log(page, coordinates)
                        this.pages[page].dom.css('transform', transformationString);
                        executedTransformations[page] = {
                            transformationString: transformationString,
                            coordinates: coordinates
                        };
                    }
                }
                return executedTransformations;
            }
        };
        this.spin = {
            left: (states) => {
                this.currentAction = CONSTANTS.ACTION.SPIN.LEFT;
                return this.tools.loop(states);
            },
            right: (states) => {
                this.currentAction = CONSTANTS.ACTION.SPIN.RIGHT;
                return this.tools.loop(states);
            },
            up: (states) => {
                this.currentAction = CONSTANTS.ACTION.SPIN.UP;
                return this.tools.loop(states);
            },
            down: (states) => {
                this.currentAction = CONSTANTS.ACTION.SPIN.DOWN;
                return this.tools.loop(states);
            },

        };
        this.initialize()
    }
    extractProperties(data) {
        const name = data.data('alignment');
        const time = Date.now();
        return {
            name: name,
            eventId: CONSTANTS.SERVICE[name],
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
                eventId: CONSTANTS.SERVICE[name],
                dom: entry,
                timestamp: time
            }
        }
        return result;
    }
    initialize() {
        this.stage.dom.css({
            width: this.settings.windowSize.x,
            height: this.settings.windowSize.y,
            perspective: this.settings.windowSize.x
        });
        this.box.dom.css('transform', `translateZ(-${this.settings.windowSize.x}px)`);
        for (const page in this.pages) {
            let coords = CONSTANTS.ORIGIN[page];
            // if ()
                // console.log()
                coords.z = this.settings.windowSize.z;
            this.pages[page].dom.css('transform', this.tools.transformationString(coords));
        }
    }
}

module.exports = Box;