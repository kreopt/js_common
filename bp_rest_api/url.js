export class Url {
    constructor(urls) {
        // TODO: validate
        this.urls = urls;
    }

    resolve(_url, ...args) {
        var url = this.urls[_url];
        if (!url) {
            throw new Error(`no reverse for url ${url}`);
        }
        // TODO: better replacement. use template strings
        for (var i=0; i<args.length; i++) {
            url = url.replace(`$${String(i+1)}`, args[i]);
        }
        return url;
    }
}
