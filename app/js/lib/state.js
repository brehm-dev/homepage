const TYPE = {
    INITIAL: 'initial',
    NORMAL: 'normal',
    FINAL: 'final'
};

class State {
    constructor(name, type, transition) {
        this.name = name;
        this.type = type;
        this.transition = transition;
    }
    isInitial() {
        // return this.type == TYPE.INITIAL ? true : false;
    }
    getTransition() {
        return this.transition;
    }
    static get type() {
        return TYPE;
    }

    static getInstance(translations) {
        let states = {};
        for (let i = 0; translations.length; i++) {
            if (i == 0) {
                states[translations[i].name] = new this(translations[i].name, TYPE.INITIAL, translations[i].content);
            }
        }
    }
}

module.exports = State;