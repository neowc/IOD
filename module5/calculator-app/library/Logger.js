class Logger {
    constructor(referrer, id) {
        this.referrer = referrer;
        this.id = id;
    }

    log = (value, ops) => {
        console.log(`[${this.referrer}:${this.id}]${ops}: ${value}`);
    };
}

module.exports = Logger;