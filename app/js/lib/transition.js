const Constants = require('./constants');

class Transition {
    constructor(steps) {
        this.index = 0;
        this.steps = steps;
        this.coords = {
            front:  { x:   0,   y:      0, z: 100 },
            left:   { x:   0,   y:    -90, z: 100 },
            right:  { x:   0,   y:     90, z: 100 },
            back:   { x:   0,   y:    180, z: 100 },
            top:    { x:  90,   y:      0, z: 100 },
            bottom: { x: -90,   y:      0, z: 100 }
        }
        this.iterator = Constants.interator;
    }
    [Symbol.iterator]() {
        return this;
    }
    add(val) {
        return val += 90;
    }
    sub(val) {
        return val -= 90;
    }
    left(coord) {
        return {
            x: coord.x,
            y: this.add(coord.y),
            z: coord.z
        }
    }
    right(coord) {
        return {
            x: coord.x,
            y: this.sub(coord.y),
            z: coord.z
        }
    }
    up(coord) {
        return {
            x: this.add(coord.x),
            y: coord.y,
            z: coord.z
        }
    }
    down(coord) {
        return {
            x: this.sub(coord.x),
            y: coord.y,
            z: coord.z
        }
    }
    next() {
        if (this.index < Object.getOwnPropertyNames(this.coords).length) {
            const pageName = this.iterator.next().value;
            let result = {
                name: pageName,
                origin: this.coords[pageName],
                transitions: []
            };
            result.transitions.push({
                left: result.origin,
                right: result.origin,
                up: result.origin,
                down: result.origin
            });
            for (let i = 0; i <= this.steps; i++) {
                result.transitions.push({
                    left: this.left(result.transitions[i].left),
                    right: this.right(result.transitions[i].right),
                    up: this.up(result.transitions[i].up),
                    down: this.down(result.transitions[i].down)
                });
            }
            return result;
        } else {
            this.index = 0;
            return false;
        }
    }
}

module.exports = Transition;