class Storage {
    constructor() {
        this._storage = [];

    }
    initialize() {
        this.template = (data) => {
            const time = Date.now();
            const out = {
                id: btoa(this.name + time),
                name: this.name,
                timestamp: time,
                data: data
            }
            return out;
        };
    }
    add(data) {
        this._storage.push(this.template(data))
    }
}

class Cache extends Storage {
    constructor(name, base) {
        super();
        this.name = name;
        this.base = base;
        this.initialize()
        this.add("init commit");
    }
}

module.exports = Cache;