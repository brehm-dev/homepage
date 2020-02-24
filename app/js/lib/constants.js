const COLLECTION = {
    PAGE: {
        front: 'front',
        left: 'left',
        right: 'right',
        back: 'back',
        top: 'top',
        bottom: 'bottom'
    },
    SERVICE: {
        front: 'stage.box.page.front',
        left: 'stage.box.page.left',
        right: 'stage.box.page.right',
        back: 'stage.box.page.back',
        top: 'stage.box.page.top',
        bottom: 'stage.box.page.bottom'
    },
    ACTION: {
        SPIN: {
            LEFT: 'left',
            RIGHT: 'right',
            UP: 'up',
            DOWN: 'down'
        }
    },
    ORIGIN: {
        front:  { x:   0,   y:      0, z: 50 },
        left:   { x:   0,   y:    -90, z: 50 },
        right:  { x:   0,   y:     90, z: 50 },
        back:   { x:   0,   y:    180, z: 50 },
        top:    { x:  90,   y:      0, z: 50 },
        bottom: { x: -90,   y:      0, z: 50 }
    }
};

class Constants {
    static get PAGE() {
        return COLLECTION.PAGE;
    }
    static get ACTION() {
        return COLLECTION.ACTION;
    }
    static get SERVICE() {
        return COLLECTION.SERVICE;
    }
    static get ORIGIN() {
        return COLLECTION.ORIGIN;
    }


    static get interator() {
        return {
            index: 0,
            data: {
                0: COLLECTION.PAGE.front,
                1: COLLECTION.PAGE.left,
                2: COLLECTION.PAGE.right,
                3: COLLECTION.PAGE.back,
                4: COLLECTION.PAGE.top,
                5: COLLECTION.PAGE.bottom
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