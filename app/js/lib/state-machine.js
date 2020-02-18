const Cache = require('./cache');

const COLLECTION = {
    UNIT: {
        stage: 'stage',
        box: 'stage.box',
        page: {
            front: 'stage.box.page.front',
            left: 'stage.box.page.left',
            right: 'stage.box.page.right',
            back: 'stage.box.page.back',
            top: 'stage.box.page.top',
            bottom: 'stage.box.page.bottom'
        }
    },
    ACTION: {
        SPIN: {
            LEFT: 'spin.left',
            RIGHT: 'span.right',
            UP: 'spin.up',
            DOWN: 'spin.down'
        }
    },
    SLUG: {
        PAGES: 'pages',
        BOX: 'box',
        STAGE: 'stage',
    },
    TOKEN: {
        stage: 'stage',
        box: 'box',
        front: 'front',
        left: 'left',
        right: 'right',
        back: 'back',
        top: 'top',
        bottom: 'bottom'
    },
    STATE: {
        // all box items were encountered
        INITIALIZED: 'initialized',
        STARTED: 'started'
    }
};



class StateMachine {
    constructor(targetName) {
        const name = 'state-machine';
        this.name = `${name}.${COLLECTION.UNIT.box}`;
        this.Cache = new Cache(`${name}.${targetName}`);
    }
    init(obj) {
        this.Cache.add({
            status: COLLECTION.STATE.INITIALIZED,
            data: [obj[COLLECTION.SLUG.STAGE], obj[COLLECTION.SLUG.BOX], obj[COLLECTION.SLUG.PAGES]]
        });
    }

    getName() {
        return this.name;
    }

    static get ACTION() {
        return COLLECTION.ACTION;
    }

    static get ID() {
        return COLLECTION.ID;
    }

    static get UNIT() {
        return COLLECTION.UNIT;
    }

    static get TOKEN() {
        return COLLECTION.TOKEN;
    }

    static get SLUG() {
        return COLLECTION.SLUG;
    }

    static get STATE() {
        return COLLECTION.STATE;
    }
}

module.exports = StateMachine;