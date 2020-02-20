const EventDispatcher   = require('./lib/event-dispatcher');
const StateMachine      = require('./lib/state-machine');
const Transition        = require('./lib/transition');
const Constants         = require('./lib/constants');
const State             = require('./lib/state');

class Box {
    constructor(box) {
        this.version = '2.9.3';
        this.stage = this.extractProperties(box.parent());
        this.box = this.extractProperties(box);
        this.pages = this.extractBulkProperties(box.children());
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
    spinLeft(transitions) {

        for (const page in transitions) {

            // this.pages[page].dom.css('transform', transitions[page]);
            // console.log();
        }
    }
}

class BoxBuilder {
    constructor(options) {
        const BOX = new Box($(options.box));
        let PageGenerator = new Transition();
        let states = {
            front: new State(Constants.SERVICE.page.front, State.TYPE.INITIAL, PageGenerator.next()),
            left: new State(Constants.SERVICE.page.left, State.TYPE.INITIAL, PageGenerator.next()),
            right : new State(Constants.SERVICE.page.right, State.TYPE.INITIAL, PageGenerator.next()),
            back: new State(Constants.SERVICE.page.back, State.TYPE.INITIAL, PageGenerator.next()),
            top: new State(Constants.SERVICE.page.top, State.TYPE.INITIAL, PageGenerator.next()),
            bottom: new State(Constants.SERVICE.page.bottom, State.TYPE.INITIAL, PageGenerator.next())
        };
        let transitions = {
            front: states.front.getTransition(),
            left: states.left.getTransition(),
            right : states.right.getTransition(),
            back: states.back.getTransition(),
            top: states.top.getTransition(),
            bottom: states.bottom.getTransition()
        };
        const eventDispatcher = new EventDispatcher();
        const PageStateMachine = new StateMachine(BOX, states, transitions, eventDispatcher);
        console.log(PageStateMachine)
    }
}

module.exports = BoxBuilder;