export class CookieParser {
    constructor(cookie_string) {
        this.cookieArray = cookie_string.split(';');
    }

    _paramStr(param, val) {
        return val ? `;${param}=${val}` : "";
    }

    get(cookieName) {
        for (let cookie of this.cookieArray) {
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            let cookieHalves = cookie.split('=');
            if (cookieHalves[0] == cookieName) {
                return cookieHalves[1];
            }
        }
        return "";
    }

    set(name, value, expires, path, domain, secure) {
        let today = new Date();
        today.setTime(today.getTime());

        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        let expires_date = new Date(today.getTime() + (expires));

        document.cookie = `${name}=${encodeURI(value)}
                            ${this._paramStr("expires", expires_date.toUTCString())}
                            ${this._paramStr("path", path )}
                            ${this._paramStr("domain", domain )}
                            ${this._paramStr("secure", secure )}`
    }
}