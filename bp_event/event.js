const listener = Symbol("event_listener");
const listeners = Symbol("event_listeners");

export class DestructibleEventListener {
    constructor(eventListener) {
        this[listener] = eventListener;
        this[listeners] = new Map();
    }

    destroy() {
        this[listeners].forEach((listener_set, event)=>{
            listener_set.forEach((fn)=>{
                this[listener].removeEventListener(event, fn);
            });
            listener_set = null;
        });
        this[listeners] = null;
    }

    addEventListener(event, fn) {
        if (!this[listeners].has(event)) {
            this[listeners].set(event, new Set());
        }
        this[listeners].get(event).add(fn);
        this[listener].addEventListener(event, fn, false);
    }

    removeEventListener(event, fn) {
        this[listener].removeEventListener(event, fn, false);
        if (this[listeners].has(event)) {
            this[listeners].set(event, new Set());
            let ev = this[listeners].get(event);
            ev.delete(fn);
            if (!ev.size) {
                this[listeners].delete(event);
            }
        }
    }

    dispatchEvent(event) {
        this[listener].dispatchEvent(event);
    }
}

export class EventEmitter {
    constructor() {
        this[listener] = new DestructibleEventListener(document.createElement('div'));
    }

    destroy() {
        this[listener].destroy();
        this[listener] = null;
    }

    addEventListener(event, fn) {
        this[listener].addEventListener(event, fn, false);
    }

    removeEventListener(event, fn) {
        this[listener].removeEventListener(event, fn, false);
    }

    dispatchEvent(event, data) {
        this[listener].dispatchEvent(new CustomEvent(event, {detail: data}))
    }
}
