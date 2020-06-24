/**
 * Author: Andreas Brehm <andreasbrehm@live.de>
 **/
class CssDetector {
    constructor() {
    }
}
class TransformStringGenerator {
    constructor() {
    }
    generate(obj) {
        console.log(obj)
        if (
            obj.action !== undefined &&
            obj.axis !== undefined &&
            obj.range !== undefined &&
            obj.unit !== undefined
        ) {
            return `${obj.action}${obj.axis}(${obj.range}${obj.unit})`;
        }
        return false
    }
    chain(bunch) {
        let bag = [];
        // console.log(bunch, bunch.length)
        for (const b of bunch) {
            bag.push(this.generate(b))
        }
        return bag.join(' ');
    }
}

class Calibrator {
    constructor(settings) {
        // console.log(settings)
        this.cssDetector = new CssDetector()
        const $window = $(window);
        const windowWidth = $window.width();
        const windowHeight = $window.height();
        const TSG = new TransformStringGenerator();
        const CON = {
            X: 'X',
            Y: 'Y',
            Z: 'Z',
            HUNDRED_PERCENT: '100%',
            TRANSLATE: 'translate',
            ROTATE: 'rotate',
            PERSPECTIVE: 'perspective',
            PX: 'px',
            DEG: 'deg'
        }
        // const TransformStringGenerator = {
        //     generate: (action, axis, range, unit) => {
        //         return `${action}${axis}(${range}${unit})`;
        //     },
        //     chain: (list) => {
        //         let string = "";
        //         for (const entry of list) {
        //             console.log(this)
        //         }
        //     }
        // }
        const Transform = {
            stage: {
                style: {
                    width: windowWidth,
                    height: windowHeight,
                    perspective: windowWidth
                }
            },
            box: {
                style: {
                    transform: TSG.generate({
                        action: CON.TRANSLATE,
                        axis: CON.Z,
                        range: windowWidth/2,
                        unit: CON.PX
                    })

                }
            },
            front: {
                style: {
                    width: windowWidth,
                    height: windowHeight,
                    transform: TSG.generate({
                        action: CON.TRANSLATE,
                        axis: CON.Z,
                        range: windowWidth/2,
                        unit: CON.PX
                    })
                }
            },
            left: {
                style: {
                    width: windowWidth,
                    height: windowHeight,
                    transform: TSG.chain([
                        {
                            action: CON.ROTATE,
                            axis: CON.Y,
                            range: -90,
                            unit: CON.DEG
                        },
                        {
                            action: CON.TRANSLATE,
                            axis: CON.Z,
                            range: windowWidth/2,
                            unit: CON.PX
                        }
                    ])
                }
            },
            right: {
                style: {
                    width: windowWidth,
                    height: windowHeight,
                    transform: TSG.chain([
                        {
                            action: CON.ROTATE,
                            axis: CON.Y,
                            range: 90,
                            unit: CON.DEG
                        },
                        {
                            action: CON.TRANSLATE,
                            axis: CON.Z,
                            range: windowWidth/2,
                            unit: CON.PX
                        }
                    ])
                }
            },
            back: {
                style: {
                    width: windowWidth,
                    height: windowHeight,
                    transform: TSG.chain([
                        {
                            action: CON.ROTATE,
                            axis: CON.Y,
                            range: 180,
                            unit: CON.DEG
                        },
                        {
                            action: CON.TRANSLATE,
                            axis: CON.Z,
                            range: windowWidth/2,
                            unit: CON.PX
                        }
                    ])
                }
            },
            top: {
                style: {
                    width: windowWidth,
                    height: windowWidth,
                    transform: TSG.chain([
                        {
                            action: CON.ROTATE,
                            axis: CON.X,
                            range: 90,
                            unit: CON.DEG
                        },
                        {
                            action: CON.TRANSLATE,
                            axis: CON.Z,
                            range: windowWidth/2,
                            unit: CON.PX
                        }
                    ])
                }
            },
            bottom: {
                style: {
                    width: windowWidth,
                    height: windowWidth,
                    transform: TSG.chain([
                        {
                            action: CON.ROTATE,
                            axis: CON.X,
                            range: -90,
                            unit: CON.DEG
                        },
                        {
                            action: CON.TRANSLATE,
                            axis: CON.Z,
                            range: windowWidth/2,
                            unit: CON.PX
                        }
                    ])
                }
            }
        }
        console.log(Transform)
    }
}

module.exports = Calibrator;