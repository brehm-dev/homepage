/**
 * Author: Andreas Brehm <andreasbrehm@live.de>
 **/
class TransformStringGenerator {
    constructor() {}
    generate(obj) {
        if (
            typeof obj === "object" &&
            obj.action !== undefined &&
            obj.range !== undefined &&
            obj.unit !== undefined
        ) {
            return `${obj.action}(${obj.range}${obj.unit})`
        }
        return false
    }
    chain(bunch) {
        let bag = []
        for (const b in bunch) {
            bag.push(this.generate(bunch[b]))
        }
        return bag.join(' ')
    }
}

const TAGS = {
    DIRECTION: {
        LEFT:           'left',
        RIGHT:          'right'
    },
    STATES: {
        INITIALIZED:    'initialized',
        IDLE:           'idle',
        MOVE: {
            LEFT:       'moved.left',
            RIGHT:      'moved.right',
            UP:         'moved.up',
            DOWN:       'moved.down'
        }
    },
    ACTION: {
        ROTATE_X:       'rotateX',
        ROTATE_Y:       'rotateY',
        TRANSLATE_Z:    'translateZ'
    },
    UNIT: {
        PX:             'px',
        DEG:            'deg'
    },
    ELEMENTS: {
        STAGE:          'stage',
        BOX:            'box',
        FRONT:          'front',
        LEFT:           'left',
        RIGHT:          'right',
        BACK:           'back'
    }
}

class Calibrator {
    constructor() {
        this.StringGenerator = this.getGeneratorInstance()
        this.TAGS = TAGS
        this.configuration = this.getOriginConfigurations(window.innerWidth, window.innerHeight)
    }
    getGeneratorInstance() {
        if (this.StringGenerator === undefined) {
            this.StringGenerator = new TransformStringGenerator()
        }
        return this.StringGenerator
    }

    getConfig() {
        return this.configuration;
    }

    getTags() {
        return this.TAGS;
    }

    getOriginConfigurations(width, height) {
        return {
            stage: {
                style: {
                    width: width,
                    height: height,
                    perspective: width
                }
            },
            box: {
                style: {
                    width: width,
                    height: height,
                },
                coordinates: {
                    action: this.TAGS.ACTION.TRANSLATE_Z,
                    range: -width/2,
                    unit: this.TAGS.UNIT.PX
                }
            },
            front: {
                style: {
                    width: width,
                    height: height
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ACTION.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Y: {
                        action: this.TAGS.ACTION.ROTATE_Y,
                        range: 0,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Z: {
                        action: this.TAGS.ACTION.TRANSLATE_Z,
                        range: width/2,
                        unit: this.TAGS.UNIT.PX
                    }
                }
            },
            left: {
                style: {
                    width: width,
                    height: height
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ACTION.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Y: {
                        action: this.TAGS.ACTION.ROTATE_Y,
                        range: -90,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Z: {
                        action: this.TAGS.ACTION.TRANSLATE_Z,
                        range: width/2,
                        unit: this.TAGS.UNIT.PX
                    }
                }
            },
            right: {
                style: {
                    width: width,
                    height: height
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ACTION.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Y: {
                        action: this.TAGS.ACTION.ROTATE_Y,
                        range: 90,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Z: {
                        action: this.TAGS.ACTION.TRANSLATE_Z,
                        range: width/2,
                        unit: this.TAGS.UNIT.PX
                    }
                }
            },
            back: {
                style: {
                    width: width,
                    height: height
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ACTION.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Y: {
                        action: this.TAGS.ACTION.ROTATE_Y,
                        range: 180,
                        unit: this.TAGS.UNIT.DEG
                    },
                    Z: {
                        action: this.TAGS.ACTION.TRANSLATE_Z,
                        range: width/2,
                        unit: this.TAGS.UNIT.PX
                    }
                }
            }
        }
    }
    calculateTransition(element) {
        // TODO: outsource function for recalculating coordinates
        // console.log(element)
        element.style.transform = this.StringGenerator.chain(element.coordinates)
        return {
            left: {
                coordinates: {
                    X: element.coordinates.X,
                    Y: {
                        action: element.coordinates.Y.action,
                        range: (element.coordinates.Y.range + 90),
                        unit: element.coordinates.Y.unit
                    },
                    Z: element.coordinates.Z
                }
            },
            right: {
                coordinates: {
                    X: element.coordinates.X,
                    Y: {
                        action: element.coordinates.Y.action,
                        range: (element.coordinates.Y.range - 90),
                        unit: element.coordinates.Y.unit
                    },
                    Z: element.coordinates.Z
                }
            }
        }
    }
}

module.exports = Calibrator;