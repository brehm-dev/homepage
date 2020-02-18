const CoordsGenerator = require('./coords-generator');
// const Cache = require('./cache');
const StateMachine = require('./state-machine');

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
        this.name = StateMachine.UNIT.box;
        this.StateMachine = new StateMachine(this.name);
        this.version = '2.9.3';
        let Filter = (element) => {
            const Scanner = (el, name) => {
                return Writer(el,name);

            };
            const Writer = (el, name) => {
                return {
                    name: name,
                    dom: el,
                    resolution: ResolutionScanner.scan(el),
                    transform: TransformScanner.scan(el)
                }
            };
            if (element.length > 1) {
                let coords = {};
                for (let e of element) {
                    const el = $(e);
                    const name = el.data('orientation');
                    if (StateMachine.TOKEN[name]) {
                        coords[name] = Scanner(el, StateMachine.UNIT.page[name]);
                    }
                }
                return coords;
            } else {
                return Scanner(element, StateMachine.UNIT[element.data('orientation')]);
            }
        };

        this.stage = Filter(box.parent());
        this.box = Filter(box);
        this.pages = Filter(box.children());
        this.StateMachine.init(this);
        console.log(this)

    }
}


class BoxHelper {
    constructor(options) {
        this.box = new Box($(options.box));



    }
}


module.exports = BoxHelper;