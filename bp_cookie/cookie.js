export const Cookie = {

    _paramStr(param, val) {
        return val ? `;${param}=${val}` : "";
    },

    get(cookieName) {
        let cookieArray = document.cookie.split(';');
        for (let cookie of cookieArray) {
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            let cookieHalves = cookie.split('=');
            if (cookieHalves[0] == cookieName) {
                return cookieHalves[1];
            }
        }
        return "";
    },

    set(name, value, expires, path="", domain"", secure="") {
        let today = new Date();
        today.setTime(today.getTime());

        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        let expires_date = new Date(today.getTime() + (expires));

        document.cookie = `${name}=${encodeURI(value)}
                            ${Cookie._paramStr("expires", expires_date.toUTCString())}
                            ${Cookie._paramStr("path", path )}
                            ${Cookie._paramStr("domain", domain )}
                            ${Cookie._paramStr("secure", secure )}`;
    },
    
    erase(name) {
        CookieParser.set(name, "", -1);
    }
}
