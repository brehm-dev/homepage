const COLLECTION = {
    PAGES: {
        front: 'front',
        left: 'left',
        right: 'right',
        back: 'back',
        top: 'top',
        bottom: 'bottom'
    },
    SERVICE: {
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

class Constants {
    static get PAGES() {
        return COLLECTION.PAGES;
    }
    static get ACTION() {
        return COLLECTION.ACTION;
    }
    static get SERVICE() {
        return COLLECTION.SERVICE;
    }

    static get interator() {
        return {
            index: 0,
            data: {
                0: COLLECTION.PAGES.front,
                1: COLLECTION.PAGES.left,
                2: COLLECTION.PAGES.right,
                3: COLLECTION.PAGES.back,
                4: COLLECTION.PAGES.top,
                5: COLLECTION.PAGES.bottom
            },
            [Symbol.iterator]() {
                this.current = this.data[this.index];
                return this;
            },
            next() {
                if (this.index < Object.getOwnPropertyNames(this.data).length) {
                    return { value: this.data[this.index++], done: false }
                } else {
                    this.index = 0;
                    return { done: true }
                }
            }
        };
    }
}

module.exports = Constants;