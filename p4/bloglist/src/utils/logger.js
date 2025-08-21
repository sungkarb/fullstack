const logger = (() => {
    /**
     * Logs information to the console
     * 
     * @param  {...any} params - list of messages to write
     */
    function info(...params){
        if (process.env.NODE_ENV !== "test")
            console.log(...params);
    }

    function error(...params){
        if (process.env.NODE_ENV !== "test")
            console.error(...params);
    }

    return {
        info,
        error
    };
})();

module.exports = logger;
