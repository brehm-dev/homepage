class Storage {
    constructor() {
        this._storage = {};

    }
    overview() {
        return Object.entries(this._storage);
    }
    get(id) {
        if (this._storage.hasOwnProperty(id)) {
            return this._storage[id];
        }
        return false;
    }
    set(id, value) {
        if (!this._storage.hasOwnProperty(id)) {
            Object.defineProperty(this._storage, id, value);
            return this.get(id);
        }
        return this._storage[id];
    }
    initialize() {
        this.template = (data) => {
            const time = Date.now();
            return {
                id: btoa(this.name + time),
                name: this.name,
                timestamp: time,
                data: data
            }
        };
    }
    add(data) {
        const template = this.template(data);
        this._storage[template.id] = template;
    }

}

class Cache extends Storage {
    constructor(name) {
        super();
        this.name = name;
        this.initialize()
        this.add("init commit");
    }
}

module.exports = Cache;