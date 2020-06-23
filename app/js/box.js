const DIRECTION = {
    LEFT:   'left',
    RIGHT:  'right',
    UP:     'up',
    DOWN:   'down'
};
const ACTION = {
    LEFT:   'spin.left',
    RIGHT:  'spin.right',
    UP:     'spin.up',
    DOWN:   'spin.down'
};

class Transition {
    constructor() {
        const z = $(window).width()/2;
        this.origin = {
            front:  { x:   0,   y:      0, z: z },
            left:   { x:   0,   y:    -90, z: z },
            right:  { x:   0,   y:     90, z: z },
            back:   { x:   0,   y:    180, z: z },
            top:    { x:  90,   y:      0, z: z },
            bottom: { x: -90,   y:      0, z: z }
        };
        this.tools = {
            add(val) {
                return val += 90;
            },
            sub(val) {
                return val -= 90;
            },
            left(coordinate) {
                return {
                    x: coordinate.x,
                    y: this.add(coordinate.y),
                    z: coordinate.z
                }
            },
            right(coordinate) {
                return {
                    x: coordinate.x,
                    y: this.sub(coordinate.y),
                    z: coordinate.z
                }
            },
            up(coordinate) {
                return {
                    x: this.sub(coordinate.x),
                    y: coordinate.y,
                    z: coordinate.z
                }
            },
            down(coordinate) {
                return {
                    x: this.add(coordinate.x),
                    y: coordinate.y,
                    z: coordinate.z
                }
            },
            get(direction, coordinate) {
                if (!coordinate) {
                    coordinate = this.origin[direction];
                }
                return this[direction](coordinate);
            }
        };
        this.get = {
            left: (coordinate) => {
                return this.tools.get(DIRECTION.LEFT, coordinate);
            },
            right: (coordinate) => {
                return this.tools.get(DIRECTION.RIGHT, coordinate);
            },
            up: (coordinate) => {
                return this.tools.get(DIRECTION.UP, coordinate);
            },
            down: (coordinate) => {
                return this.tools.get(DIRECTION.DOWN, coordinate);
            },
            transformationString(c) {
                // translate coordinates to transform string
                if (!c) {
                    if (!c.x || !c.y || !c.z) {
                        throw Error("coordinates (x,y,z) must be set")
                    }
                }
                return `rotateX(${c.x}deg) rotateY(${c.y}deg) translateZ(${c.z}px)`;
            }
        };
    }
    getOriginForPage(page) {
        return this.origin[page];
    }
}

class Detector {
    constructor(value) {
        if (!$) console.log("jquery is not ready")
        this.value = $(value)
    }
}


class ScreenDetector extends Detector {
    constructor() {
        super(window)
        const $window = this.value;
        $window.on('resize', (event) => {
            console.log(event)
        });
        this.ranges = {
            width: $window.width(),
            height: $window.height(),

        }
        // console.log(this)
    }
    static screenInformation(obj) {
        if (!$) throw Error('require jquery');
        console.log(obj)
        return {
            width: obj.width(),
            height: obj.height(),

        }
    }
}

class Box {
    constructor(box) {
        const screenDetector = new ScreenDetector();
        ScreenDetector.screenInformation(box)
        this.Box = box;
        this.Stage = this.Box.parent();
        this.Pages = this.extractPagesProperties(this.Box.children());
        this.Transitor = new Transition();
        this.history = [];
        this.optimizeResolution()
    }
    optimizeResolution() {
        const $w = $(window);
        const s = {
            x: $w.width(),
            y: $w.height(),
            z: $w.height()/2
        };
        this.Stage.css({
            width: s.x,
            height: s.y,
            perspective: s.x
        });
        this.Box.css('transform', `translateZ(-${s.z}px)`);
        const executedCoordinates = {};
        for (const page in this.Pages) {
            if (this.Pages.hasOwnProperty(page)) {
                const coordinate = this.Transitor.getOriginForPage(page);

                this.Pages[page].css('transform', this.Transitor.get.transformationString(coordinate));
                executedCoordinates[page] = coordinate;
            }
        }
        this.history.push(executedCoordinates);
    }
    spinLeft() {
        this.spin(ACTION.LEFT);
    }
    spinRight() {
        this.spin(ACTION.RIGHT);
    }
    spinUp() {
        this.spin(ACTION.UP);
    }
    spinDown() {
        this.spin(ACTION.DOWN);
    }
    spin(direction) {
        const executedCoordinates = {};
        for (const page in this.Pages) {
            const coordinate = this.Transitor.get[direction](this.history[this.history.length -1][page]);
            this.Pages[page].css('transform', this.Transitor.get.transformationString(coordinate));
            executedCoordinates[page] = coordinate;
        }
        this.history.push(executedCoordinates);
    }
    extractPagesProperties(pages) {
        const extractedProperties = {};
        for (let i = 0; i <= pages.length; i++) {
            if (pages[i] !== undefined) {
                const page = $(pages[i]);
                extractedProperties[page.data('alignment')] = page;
            }
        }
        return extractedProperties;
    }
}

module.exports = Box;