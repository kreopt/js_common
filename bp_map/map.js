const mapLoaded = Symbol("map_loaded");
const loaders = {};
const loaded = {};

export class Map {

    static TYPE_YANDEX = Symbol("map.yandex");
    static TYPE_GOOGLE = Symbol("map.google");
    static TYPE_OSM    = Symbol("map.osm");
    
    constructor(type, opts={}) {
        this.mapLoaded = loaders[type](opts) || Promise.reject();
    }  
    
    get ready() {
        return this.mapLoaded;
    }
}

loaders[Map.TYPE_YANDEX] = function loadYMap(opts={}) {
    if (loaded[Map.TYPE_YANDEX]) {
        return loaded[Map.TYPE_YANDEX];
    } else {
        loaded[Map.TYPE_YANDEX] = new Promise((resolve, reject)=>{
            let realOpts = Object.assign({version:'2.1', params:{lang: 'ru_RU'}}, opts);            
            let map_script = document.createElement('script');
            let params = [];
            for (let key in realOpts.params) {
                params.push(`${key}=${opts.params[key]}`)
            }
            map_script.src = `https://api-maps.yandex.ru/${opts.version}/?${params.join('&')}`;
            map_script.onload=()=>{
                resolve();
            };
            map_script.onerror=()=>{
                reject();
            };
            document.body.appendChild(map_script);
        });
        return loaded[Map.TYPE_YANDEX];
    }
}
