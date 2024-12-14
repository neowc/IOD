class Logger {
    constructor(referrer, id) {
        this.referrer = referrer;
        this.id = id;
    }

    log = (value) => {
        console.log(`[${this.referrer}:${this.id}] : ${value}`);
    };
}

module.exports = Logger;