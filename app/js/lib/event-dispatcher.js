class EventDispatcher {
    constructor() {
        this._events = {};
    }
    addListner(id, callback) {
        if (this._events[id] !== undefined) {
            throw Error(`Event: ${id} is already in queue`);
            // if (this._events[id].callbacks === undefined) {
            //     throw Error(`Callback is already in queue`);
            // }
        } else {

            this._events[id] = {
                callback: callback
            };
        }
        return true;
    }
    eventAction(id) {
        if (!id) {
            throw Error(`${id} is an invalid entry`);
        }
        if (!this._events[id].callback) {
            throw Error("callback is uncallable");
        }
        console.log(this)
        this._events[id].callback();
        return true;
    }
    removeListener(id) {
        if (!this._events[id]) {
            throw Error('Event not found!')
        }
        delete this._events[id];
        return true;
    }

}

module.exports = EventDispatcher;