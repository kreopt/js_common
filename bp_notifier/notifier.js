export class NotificationMgr {
    constructor(_opts) {
        this.opts = Object.assign({
            icons:{
                "warning": undefined,
                "error": undefined,
                "info": undefined
            },
            notifier:{}
        }, _opts);
        this.enabled = ("Notification" in window);
    }

    _getPermission() {
        if (Notification.permission === "granted") {
            return Promise.resolve();
        } else if (Notification.permission !== 'denied') {
            return Notification.requestPermission();
        }
    }

    _message(title, message, type) {
        if (!this.enabled) return;
        this._getPermission().then(()=>{
            let notification = new Notification(title, Object.assign(this.opts.notifier, {
                body: message,
                icon: this.opts.icons[type],
                tag: type
            }));
        });
    }

    warning(title, message) {
        this._message(title, message, "warning");
    }

    error(title, message) {
        this._message(title, message, "error");
    }

    info(title, message) {
        this._message(title, message, "info");
    }
}