export class RESTApi {
    constructor(server, options) {
        options = options || {json:true};
        this.json = options.json;
        if (this.json) {
            this.parser = JSON.parse;
        } else {
            this.parser = (text)=>{return text};
        }

        this.server = server;
        if (!this.server.endsWith('/')) {
            this.server+='/';
        }
    }

    call(method, url, data){
        data = data || {};
        if (url.startsWith('/')) {
            url = url.substring(1);
        }
        if (!url.endsWith('/')) {
            url += '/';
        }
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest;
            xhr.withCredentials = true;
            var is_get = method.toUpperCase()=='GET';
            xhr.open(is_get?'GET':"POST", this.server+url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        resolve(this.parser(xhr.responseText), xhr);
                    } else {
                        try {
                            reject(this.parser(xhr.responseText), xhr);
                        } catch (e) {
                            reject({"errors":["Unknown error"]}, xhr);
                        }
                    }
                }
            };
            xhr.setRequestHeader('X-Method-Override', method.toUpperCase());
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            if (this.json) {
                xhr.setRequestHeader('Accept', 'application/json');
            }
            xhr.send(is_get?null:JSON.stringify(data));
        });
    }

    get(url) {
        return this.call('GET', url);
    }

    delete(url) {
        return this.call('DELETE', url);
    }

    post(url, data) {
        return this.call('POST', url, data);
    }

    put(url, data) {
        return this.call('PUT', url, data);
    }
}
