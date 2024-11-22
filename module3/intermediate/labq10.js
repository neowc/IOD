const today = new Date();
console.log('Current time is ' + today.toLocaleTimeString())
console.log(today.getHours() + ' hours have passed so far today')

//Print the total number of minutes that have passed so far today
const minutes = today.getHours() * 60 + today.getMinutes();
console.log(minutes + ' minutes have passed so far today')

//Print the total number of seconds that have passed so far today
const seconds = today.getHours() * 60 * today.getMinutes() * 60 + today.getSeconds();
console.log(seconds + ' seconds have passed so far today')

//Calculate and print your age as: 'I am x years, y months and z days old'
//const birthDate = new Date(1990, 5, 25); //= new Date("1990-01-01");
const birthYear = 1990;
const birthMonth = 5;
const birthDay = 25;
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();
const ageYears = currentYear - birthYear;
const ageMonths = currentMonth - birthMonth;
const ageDays = currentDay - birthDay;
console.log(`I am ${ageYears} years, ${ageMonths} months and ${ageDays} days old`)

//Write a function daysInBetween(date1, date2) which calculates and returns the amount of days in between the two given dates
function daysInBetween(date1, date2) {
    const diff = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays;
}
const date1 = new Date(2024, 0, 1);
const date2 = new Date(2024, 10, 31);
console.log(daysInBetween(date1, date2) + ' days are in between the two dates')
