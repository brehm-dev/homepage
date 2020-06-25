/**
 * Author: Andreas Brehm <andreasbrehm@live.de>
 **/
class TransformStringGenerator {
    constructor() {}
    generate(obj) {
        if (
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


class Calibrator {
    constructor() {
        const $window = $(window);
        this.StringGenerator = new TransformStringGenerator();
        this.TAGS = {
            ACTION: {
                ROTATE_X: 'rotateX',
                ROTATE_Y: 'rotateY',
                TRANSLATE_Z: 'translateZ'
            },
            UNIT: {
                PX: 'px',
                DEG: 'deg'
            },
            ELEMENTS: {
                STAGE: 'stage',
                BOX: 'box',
                FRONT: 'front',
                LEFT: 'left',
                RIGHT: 'right',
                BACK: 'back',
                TOP: 'top',
                BOTTOM: 'bottom'
            }
        }
        this.configuration = this.getOriginConfigurations($window.width(), $window.height())
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
                        unit: this.TAGS.DEG
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
    getConfig() {
        return this.configuration;
    }
    getTags() {
        return this.TAGS;
    }
    calculateTransition(element) {
        element.style.transform = this.StringGenerator.chain(element.coordinates)
        return {
            left: {
                coordinates: {
                    x: element.coordinates.X,
                    y: {
                        action: element.coordinates.Y.action,
                        range: (element.coordinates.Y.range + 90),
                        unit: element.coordinates.Y.unit
                    },
                    z: element.coordinates.Z
                }
            },
            right: {
                coordinates: {
                    x: element.coordinates.X,
                    y: {
                        action: element.coordinates.Y.action,
                        range: (element.coordinates.Y.range - 90),
                        unit: element.coordinates.Y.unit
                    },
                    z: element.coordinates.Z
                }
            },
            up: {
                coordinates: {
                    x: {
                        action: element.coordinates.X.action,
                        range: (element.coordinates.X.range + 90),
                        unit: element.coordinates.X.unit
                    },
                    y: element.coordinates.Y,
                    z: element.coordinates.Z
                }
            },
            down: {
                coordinates: {
                    x: {
                        action: element.coordinates.X.action,
                        range: (element.coordinates.X.range - 90),
                        unit: element.coordinates.X.unit
                    },
                    y: element.coordinates.Y,
                    z: element.coordinates.Z
                }
            }
        }
    }
}

module.exports = Calibrator;