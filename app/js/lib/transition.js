const Constants = require('./constants');

const ORIGIN = {
    front:  { x:   0,   y:      0, z: 100 },
    left:   { x:   0,   y:    -90, z: 100 },
    right:  { x:   0,   y:     90, z: 100 },
    back:   { x:   0,   y:    180, z: 100 },
    top:    { x:  90,   y:      0, z: 100 },
    bottom: { x: -90,   y:      0, z: 100 }
};

class Transition {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.index = 0;
        this.tools = {
            add(val) {
                return val += 90;
            },
            sub(val) {
                return val -= 90;
            },
            left(coord) {
                return {
                    x: coord.x,
                    y: this.add(coord.y),
                    z: coord.z
                }
            },
            right(coord) {
                return {
                    x: coord.x,
                    y: this.sub(coord.y),
                    z: coord.z
                }
            },
            up(coord) {
                return {
                    x: this.add(coord.x),
                    y: coord.y,
                    z: coord.z
                }
            },
            down(coord) {
                return {
                    x: this.sub(coord.x),
                    y: coord.y,
                    z: coord.z
                }
            }
        };
        this.iterator = Constants.interator;
    }
    [Symbol.iterator]() {
        return this;
    }
    getCoordinate(serviceObjectName) {
        if (!serviceObjectName && typeof serviceObjectName != 'string') {
            throw Error(`ServiceObjectName must be set. your object-name: ${serviceObjectName}`);
        }
        const coords = this.coordinates ? this.coordinates : ORIGIN[serviceObjectName];
        return {
            left:   this.tools.left(coords),
            right:  this.tools.right(coords),
            up:     this.tools.up(coords),
            down:   this.tools.down(coords)
        }
    }
    next() {
        if (this.index < Object.getOwnPropertyNames(Constants.PAGES).length) {
            return this.getCoordinate(this.iterator.next().value)
        } else {
            this.index = 0;
            return false;
        }
    }
    static get ORIGIN() {
        return ORIGIN;
    }
}

module.exports = Transition;