class Settings {
    static get siblings() {
        return {
            front: {
                left:   'left',
                right:  'right',
                up:     'top',
                down:   'bottom'
            },
            left: {
                left:   'back',
                right:  'front',
                up:     'top',
                down:   'bottom'
            },
            right: {
                left:   'front',
                right:  'back',
                up:     'top',
                down:   'bottom'
            },
            back: {
                left:   'right',
                right:  'left',
                up:     'top',
                down:   'bottom'
            },
            top: {
                left:   'left',
                right:  'right',
                up:     'back',
                down:   'front'
            },
            bottom: {
                left:   'left',
                right:  'right',
                up:     'front',
                down:   'back'
            }
        }
    }
}
class States {
    constructor() {

    }

}

class StateController {
    constructor() {
    }
}

module.exports = StateController;