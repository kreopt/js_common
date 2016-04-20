export class EventEmitter {
    constructor() {
        this.listener = document.createElement('div');
    }

    addEventListener(event, fn) {
        this.listener.addEventListener(event, fn, false);
    }

    removeEventListener(event, fn) {
        this.listener.removeEventListener(event, fn, false);
    }

    trigger(event, data) {
        this.listener.dispatchEvent(new CustomEvent(event, {detail: data}))
    }
}