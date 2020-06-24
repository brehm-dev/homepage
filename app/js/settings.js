/**
 * Author: Andreas Brehm <andreasbrehm@live.de>
 **/
const CONSTANTS = {
    X: 'X',
    Y: 'Y',
    Z: 'Z',
    HUNDRED_PERCENT: '100%',
    TRANSLATE: 'translate',
    ROTATE: 'rotate',
    PERSPECTIVE: 'perspective'
}

const SETTINGS = {
    elements: {
        front: {
            width: CONSTANTS.HUNDRED_PERCENT,
            height: CONSTANTS.HUNDRED_PERCENT,
            transform: {
                actions: [
                    {
                        action: CONSTANTS.TRANSLATE,
                        axis: CONSTANTS.X,
                        value: CONSTANTS.HUNDRED_PERCENT
                    }
                ]
            }
        },
        left: {
            width: CONSTANTS.HUNDRED_PERCENT,
            height: CONSTANTS.HUNDRED_PERCENT,
            transform: {
                actions: [
                    {
                        action: CONSTANTS.TRANSLATE,
                        axis: CONSTANTS.Y,
                        value: CONSTANTS.HUNDRED_PERCENT
                    }
                ]
            }
        }
    }
}

module.exports = SETTINGS;