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
}

class Transition {
    constructor() {
        this.origin = {
            front:  { x:   0,   y:      0, z: 50 },
            left:   { x:   0,   y:    -90, z: 50 },
            right:  { x:   0,   y:     90, z: 50 },
            back:   { x:   0,   y:    180, z: 50 },
            top:    { x:  90,   y:      0, z: 50 },
            bottom: { x: -90,   y:      0, z: 50 }
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
                    const coordinate = this.origin[direction];
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

class Box {
    constructor(box) {
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
        const executedCoordinates = {};
        for (const page in this.Pages) {
            const coordinate = this.Transitor.get.left(this.history[this.history.length][page]);
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