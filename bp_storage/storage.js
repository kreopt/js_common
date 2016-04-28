import {Cookie} from 'bp_cookie'

const backends={};

export class Storage {
    static TYPE_LOCAL   = Symbol("storage.local");
    static TYPE_SESSION = Symbol("storage.session");
    static TYPE_COOKIE  = Symbol("storage.cookie");

    constructor(backend, prefix='global') {
        this.backend = backend;
        this.prefix = prefix;
    }

    store(key, val) {
        backends[this.backend].store(`${this.prefix}:${key}`, JSON.stringify(val));
    }

    load(key, defaultVal) {
        let val = backends[this.backend].load(`${this.prefix}:${key}`);
        return val ? JSON.parse(val) : defaultVal;
    }
    
    erase(key) {
        backends[this.backend].erase(`${this.prefix}:${key}`);
    }
}

backends[Storage.TYPE_LOCAL] = {
    store(key, val) {
        localStorage.setItem(key, val);
    },
    load(key) {
        return localStorage.getItem(key);
    },
    erase(key) {
        localStorage.removeItem(key);
    }
};

backends[Storage.TYPE_SESSION] = {
    store(key, val) {
        sessionStorage.setItem(key, val);
    },
    load(key) {
        return sessionStorage.getItem(key);
    },
    erase(key) {
        sessionStorage.removeItem(key);
    }
};

backends[Storage.TYPE_COOKIE] = {
    store(key, val) {
        Cookie.set(key, val, 365);        
    },
    load(key) {
        return Cookie.get(key);
    },
    erase(key) {
        Cookie.erase(key);
    }
};
