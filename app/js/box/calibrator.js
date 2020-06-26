/**
 * Author: Andreas Brehm <andreasbrehm@live.de>
 **/
class TransformStringGenerator {
    constructor() {}
    generate(obj) {
        // console.log(obj)
        if (
            typeof obj === "object" &&
            obj.action !== undefined &&
            obj.range !== undefined &&
            obj.unit !== undefined
        ) {
            const str = `${obj.action}(${obj.range}${obj.unit})`
            // console.log(str)
            return str
        }
        // return false
    }
    chain(bunch) {
        let bag = []
        // console.log(bunch)
        for (const b in bunch) {
            bag.push(this.generate(bunch[b]))
        }
        // console.log(bag)
        return bag.join(' ')
    }
}

class Calibrator {
    constructor() {
        const $window = $(window);
        this.StringGenerator = this.getGeneratorInstance()
        // TODO: die TAGS als Konstante außerhalb der Klasse ablegen
        this.TAGS = {
            DIRECTION: {
                LEFT:           'left',
                RIGHT:          'right',
                UP:             'up',
                DOWN:           'down'
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
                BACK:           'back',
                TOP:            'top',
                BOTTOM:         'bottom'
            }
        }
        this.configuration = this.getOriginConfigurations($window.width(), $window.height())
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
            },
            top: {
                style: {
                    width: width,
                    height: width
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ACTION.ROTATE_X,
                        range: 90,
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
            bottom: {
                style: {
                    width: width,
                    height: width
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ACTION.ROTATE_X,
                        range: -90,
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
            }
        }
    }
    calculateTransition(element) {
        console.log(element)
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
            },
            up: {
                coordinates: {
                    X: {
                        action: element.coordinates.X.action,
                        range: (element.coordinates.X.range + 90),
                        unit: element.coordinates.X.unit
                    },
                    Y: element.coordinates.Y,
                    Z: element.coordinates.Z
                }
            },
            down: {
                coordinates: {
                    X: {
                        action: element.coordinates.X.action,
                        range: (element.coordinates.X.range - 90),
                        unit: element.coordinates.X.unit
                    },
                    Y: element.coordinates.Y,
                    Z: element.coordinates.Z
                }
            }
        }
    }
}

module.exports = Calibrator;