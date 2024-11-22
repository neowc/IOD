class DigitalClock {
    constructor(prefix) {
        this.prefix = prefix;
    }
    display() {
        let date = new Date();
        //create 3 variables in one go using array destructuring
        let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        if (hours < 10) hours = '0' + hours;
        if (mins < 10) mins = '0' + mins;
        if (secs < 10) secs = '0' + secs;
        console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
    }
    stop() {
        clearInterval(this.timer);
    }
    start() {
        this.display();
        this.timer = setInterval(() => this.display(), 1000);
        //console.log(typeof this.timer); //object
        //console.log(typeof this.prefix);  //string
    }
}
const myClock = new DigitalClock('Neoclock:')
myClock.start()
// setTimeout(() => {
//     myClock.stop();
//     console.log('Clock stopped');
// }, 6000)


//a) Create a new class PrecisionClock that inherits from DigitalClock and adds the parameter precision – the number of ms between 'ticks'. This precision parameter should default to 1 second if not supplied
class PrecisionClock extends DigitalClock {
    constructor(prefix, precision = 1000) {
        super(prefix);
        this.precision = precision;
        //this.precision = precision ? precision : 1000;

    }
    start() {
        this.display();
        this.timer = setInterval(() => this.display(), this.precision);
    }
}
// const pClock = new PrecisionClock('P-clock:', 5000)
// pClock.start()
//b) Create a new class AlarmClock that inherits from DigitalClock and adds the parameter wakeupTime in the format hh:mm. When the clock reaches this time, it should print a 'Wake Up' message and stop ticking. This wakeupTime parameter should default to 07:00 if not supplied
class AlarmClock extends DigitalClock {
    constructor(prefix, wakeupTime = '07:00') {
        super(prefix);
        this.wakeupTime = wakeupTime;
    }
    start() {
        this.display();
        this.timer = setInterval(() => {
            this.display();
            let date = new Date();
            let [hours, mins] = [date.getHours(), date.getMinutes()];
            if (hours < 10) hours = '0' + hours;
            if (mins < 10) mins = '0' + mins;
            if (`${hours}:${mins}` === this.wakeupTime) {
                console.log('Wake Up');
                this.stop();
            }
        }, 1000);
    }
}
// const alarmClock = new AlarmClock('A-clock:', '14:51')
// alarmClock.start()