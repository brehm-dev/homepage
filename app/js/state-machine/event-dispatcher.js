class EventDispatcher {
    constructor() {
        this._events = {};
    }
    addListener(id, callback) {
        if (this._events[id] === undefined) {
            this._events[id] = {
                callback: callback
            }
            return true;
        }
        return false;
    }
    removeListener(id) {
        if (this._events[id] !== undefined) {
            delete this._events[id];
            return true;
        }
        return false;
    }
}

module.exports = EventDispatcher;