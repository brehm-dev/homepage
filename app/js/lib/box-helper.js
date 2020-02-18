const StateMachine = require('./state-machine');
const Transition = require('./transition')
const Constants = require('./constants');
const State = require('./state');

class TransformScanner {
    static scan(element) {
        return element.css('transform');
    }

}

class ResolutionScanner {
    static scan(element) {
        return {
            width: element.width(),
            height: element.height()
        }
    }
}

class Box {
    constructor(box) {
        this.version = '2.9.3';
        this.stage = this.extractProperties(box.parent());
        this.box = this.extractProperties(box);
        this.pages = this.extractBulkProperties(box.children());
    }
    extractProperties(data) {
        const name = data.data('orientation');
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
            const name = entry.data('orientation');
            result[name] = {
                eventId: Constants.SERVICE.page[name],
                dom: entry,
                timestamp: time
            }
        }
        return result;
    }
}


class BoxHelper {
    constructor(options) {
        const BOX = $(options.box)
        // let box = {
        //     stage:
        // };


        this.Box = new Box($(options.box));
        let PageGenerator = new Transition(4);
        let transitions = {
            front: PageGenerator.next(),
            left: PageGenerator.next(),
            right : PageGenerator.next(),
            back: PageGenerator.next(),
            top: PageGenerator.next(),
            bottom: PageGenerator.next()
        }

        const states = {
            front: new State(transitions.front.name,)
        }


        // const translations = {
        //     stage: new TransitionGenerator(this.Box.stage),
        //     box: new TransitionGenerator(this.Box.box),
        //     pages: new TransitionGenerator(this.Box.pages)
        // };
        // this.PagesStateMachine = new StateMachine(box.pages, , "test2", "test3");
        // let generator = new TransitionGenerator()
        // this.StateMachine.init(box);



    }
}


module.exports = BoxHelper;