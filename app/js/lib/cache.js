const STORAGE = {};
const SECRET = 'bFSNe0kU52A9c66sN9wKbWK%G%V#ziMD';
const AGENT = {
    id: () => {
        const now = Date.now();
        return `${btoa(SECRET + now)}`.replace('=', '');
    },
};


class Storage {
    constructor(storageName) {
        this.name = storageName;
        this.Helper = {
            read: {
                all: () => {
                    return STORAGE;
                },
            }
        };
    }
    findAll() {
        return this.Helper.read.all();
    }
    insert(data) {
        const id = AGENT.id();
        if (!data) {
            throw Error("no data entered");
        }
        STORAGE[id] = {
            created: Date.now(),
            updated: null,
            data: data
        };
        return id;
    }
}

class Cache extends Storage {
    constructor(name) {
        if (!name) {
            const name = AGENT.id()
        }
        super(name);
        // const testId = this.insert("test");
        // console.log(this.findAll())
        // const Database = this

        // this.initialize()
        // this.add("init commit");
    }
}

module.exports = Cache;