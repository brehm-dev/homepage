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
        const windowWidth = $window.width();
        const windowHeight = $window.height();
        this.StringGenerator = new TransformStringGenerator();
        this.TAGS = {
            X: 'X',
            Y: 'Y',
            Z: 'Z',
            TRANSLATE: 'translate',
            ROTATE: 'rotate',
            ROTATE_X: 'rotateX',
            ROTATE_Y: 'rotateY',
            TRANSLATE_Z: 'translateZ',
            PX: 'px',
            DEG: 'deg',
            STAGE: 'stage',
            BOX: 'box',
            PAGES: {
                front: 'front',
                left: 'left',
                right: 'right',
                back: 'back',
                top: 'top',
                bottom: 'bottom'
            }
        }
        this.configuration = {
            stage: {
                style: {
                    // width: windowWidth,
                    // height: windowHeight,
                    perspective: windowWidth
                }
            },
            box: {
                style: {
                    width: '100vw',
                    height: '100vh'
                },
                coordinates: {
                    action: this.TAGS.TRANSLATE_Z,
                    range: -windowWidth/2,
                    unit: this.TAGS.PX
                }
            },
            front: {
                style: {
                    width: windowWidth,
                    height: windowHeight
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.DEG
                    },
                    Y: {
                        action: this.TAGS.ROTATE_Y,
                        range: 0,
                        unit: this.TAGS.DEG
                    },
                    Z: {
                        action: this.TAGS.TRANSLATE_Z,
                        range: windowWidth/2,
                        unit: this.TAGS.PX
                    }
                }
            },
            left: {
                style: {
                    width: windowWidth,
                    height: windowHeight
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.DEG
                    },
                    Y: {
                        action: this.TAGS.ROTATE_Y,
                        range: -90,
                        unit: this.TAGS.DEG
                    },
                    Z: {
                        action: this.TAGS.TRANSLATE_Z,
                        range: windowWidth/2,
                        unit: this.TAGS.PX
                    }
                }
            },
            right: {
                style: {
                    width: windowWidth,
                    height: windowHeight
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.DEG
                    },
                    Y: {
                        action: this.TAGS.ROTATE_Y,
                        range: 90,
                        unit: this.TAGS.DEG
                    },
                    Z: {
                        action: this.TAGS.TRANSLATE_Z,
                        range: windowWidth/2,
                        unit: this.TAGS.PX
                    }
                }
            },
            back: {
                style: {
                    width: windowWidth,
                    height: windowHeight
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ROTATE_X,
                        range: 0,
                        unit: this.TAGS.DEG
                    },
                    Y: {
                        action: this.TAGS.ROTATE_Y,
                        range: 180,
                        unit: this.TAGS.DEG
                    },
                    Z: {
                        action: this.TAGS.TRANSLATE_Z,
                        range: windowWidth/2,
                        unit: this.TAGS.PX
                    }
                }
            },
            top: {
                style: {
                    width: windowWidth,
                    height: windowWidth
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ROTATE_X,
                        range: 90,
                        unit: this.TAGS.DEG
                    },
                    Y: {
                        action: this.TAGS.ROTATE_Y,
                        range: 0,
                        unit: this.TAGS.DEG
                    },
                    Z: {
                        action: this.TAGS.TRANSLATE_Z,
                        range: windowWidth/2,
                        unit: this.TAGS.PX
                    }
                }
            },
            bottom: {
                style: {
                    width: windowWidth,
                    height: windowWidth
                },
                coordinates: {
                    X: {
                        action: this.TAGS.ROTATE_X,
                        range: -90,
                        unit: this.TAGS.DEG
                    },
                    Y: {
                        action: this.TAGS.ROTATE_Y,
                        range: 0,
                        unit: this.TAGS.DEG
                    },
                    Z: {
                        action: this.TAGS.TRANSLATE_Z,
                        range: windowWidth,
                        unit: this.TAGS.PX
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
    checkWindowRange() {
        const w = $(window);
        return {
            width: w.width(),
            height: w.height()
        }
    }
}

module.exports = Calibrator;