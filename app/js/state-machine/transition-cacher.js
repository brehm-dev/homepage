class Cacher {
    constructor(schema) {
        this.name = 'cacher'
        this.version = '0.1.0'
        this.storage = schema || []
    }
    setValue(id, value) {
        if (this.storage[id] !== undefined) {
            this.storage[id].push(value)
        }
    }
    getValue(id) {
        if (this.storage[id] !== undefined) {
            return this.storage[id];
        }
    }
}

class TransitionsCacher extends Cacher {
    constructor(schema) {
        super(schema);
    }
    insert(tag, value) {
        this.setValue(tag, value)
        return this.storage[tag][(this.storage[tag].length - 1)]
    }
    select(tag) {
        return this.getValue(tag);
    }

}

module.exports = TransitionsCacher;