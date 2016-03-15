// ERROR=0, WARN=1, LOG=2, DEBUG=3
export const LogLevel = {
    Error: 0,
    Warn: 1,
    Log: 2,
    Debug: 3
};
export class Logger {
    constructor(level = LogLevel.Debug) {
        this.setLevel(level);
    }
    
    setLevel(level) {
        this.level = level;
    }
    
    static level_map ={
        [LogLevel.Debug]:'log',
        [LogLevel.Log]:'log',
        [LogLevel.Warn]:'warn',
        [LogLevel.Error]:'error'
    }
    _log(lvl, args) {
        if (this.level<=lvl) console[Logger.level_map[lvl]].apply(console, Array.prototype.slice.call(args));
    }
    log(){
        this._log(LogLevel.Log, arguments)
    }
    debug(){
        this._log(LogLevel.Debug, arguments)
    }
    error(){
        this._log(LogLevel.Error, arguments)
    }
    warn(){
        this._log(LogLevel.Warn, arguments)
    }
};

export const Log = new Logger();
