export class NotificationMgr {
    constructor(_opts) {
        this.opts = Object.assign({
            timeout: 3000,
            node: 'notification_area'
        }, _opts);
        this.node = document.getElementById(this.opts.node);
    }

    _message(title, message, type) {
        let note = document.createElement('div');
        note.classList.add('notification');
        note.classList.add(`notification-${type}`);
        note.innerHTML=`<header>${title}</header><div>${message}</div>`;
        note.onclick = function() {
            this.parentNode.removeChild(this);
            clearTimeout(this.timeout);
        };
        this.node.appendChild(note);
        note.timeout = setTimeout(((note)=>{
            return ()=>{
                note.parentNode.removeChild(note);
            }
        })(note), this.opts.timeout);
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