export class CustomEventListener {

    constructor() {
        this.listener = document.createElement('div');
    }

    on(event, fn) {
        this.listener.addEventListener(event, fn, false);
        return this;
    }

    off(event, fn) {
        this.listener.removeEventListener(event, fn, false);
        return this;
    }

    trigger(eventObject) {
        this.listener.dispatchEvent(eventObject);
    }

    observe(source) {
        source.attach(this);
    }
}

export class EventSource {
    constructor() {
        this.observers=new Set();
    }

    attach(listener) {
        this.observers.add(listener);
    }

    detach(listener) {
        this.observers.delete(listener);
    }

    trigger(event, data) {
        let eventObject = new CustomEvent(event, {detail: data});

        for (let observer of this.observers) {
            observer.trigger(eventObject);
        }
    }
}