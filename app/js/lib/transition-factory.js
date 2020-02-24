const CONSTANTS = require('./constants');

class Transition {
    constructor(coordinate) {
        this.angel = 90;
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
            }
        };
        this.coordinate = coordinate;
        this.actions = {
            left:   () => {
                const newCoordinate = this.tools.left(this.coordinate);
                return {
                    position: this.detectPosition(newCoordinate),
                    coordinate: newCoordinate
                };
            },
            right: () => {
                const newCoordinate = this.tools.right(this.coordinate);
                return {
                    position: this.detectPosition(newCoordinate),
                    coordinate: newCoordinate
                }
            },
            up: () => {
                const newCoordinate = this.tools.up(this.coordinate);
                return {
                    position: this.detectPosition(newCoordinate),
                    coordinate: newCoordinate
                }
            },
            down: () => {
                const newCoordinate = this.tools.down(this.coordinate);
                return {
                    position: this.detectPosition(newCoordinate),
                    coordinate: newCoordinate
                }
            }
        };

    }
    detectPosition(coordinates) {
        if (coordinates.x === coordinates.y) return CONSTANTS.PAGE.front;
        if (coordinates.y < coordinates.x) return  CONSTANTS.PAGE.left;
        if (coordinates.y > coordinates.x) return CONSTANTS.PAGE.right;
        if (coordinates.y === (2*this.angel)) return CONSTANTS.PAGE.back;
        if (coordinates.x < coordinates.y) return CONSTANTS.PAGE.top;
        if (coordinates.x > coordinates.y) return CONSTANTS.PAGE.bottom;
    }
    getTransitions() {
        return {
            left: this.actions.left(),
            right: this.actions.right(),
            up: this.actions.up(),
            down: this.actions.down()
        }
    }
}

class TransitionFactory {
    constructor() {
    }
    build(page, coordinate) {
        if (!coordinate) {
            return new Transition(CONSTANTS.ORIGIN[page]);
        } else {
            return new Transition(coordinate);
        }
    }
}

module.exports = TransitionFactory;