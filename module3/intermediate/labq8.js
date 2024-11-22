const phoneBookABC = new Map(); //an empty map to begin with
phoneBookABC.set('Annabelle', '0412312343')
phoneBookABC.set('Barry', '0433221117')
phoneBookABC.set('Caroline', '0455221182')

//Create a new phoneBookDEF Map to store names beginning with D, E or F
const phoneBookDEF = new Map();
phoneBookDEF.set('David', '0412312343')
phoneBookDEF.set('Edward', '0433221117')
phoneBookDEF.set('Frank', '0455221182')

//Initialise the contents of phoneBookDEF by passing in an array of keys/values
const phoneBookDEF2 = new Map([
    ['David', '0999999943'],
    ['Edward', '0999999917'],
    ['Frank', '0999999982']
]);
//Update the phone number for Caroline
phoneBookABC.set('Caroline', '0455221182')
//Write a function printPhoneBook(contacts) that prints the names and phone numbers in the given Map
function printPhoneBook(contacts) {
    for (let [name, number] of contacts) {
        console.log(`${name}: ${number}`);
    }
}
printPhoneBook(phoneBookABC);
printPhoneBook(phoneBookDEF);
printPhoneBook(phoneBookDEF2);
//Combine the contents of the two individual Maps into a single phoneBook Map
const phoneBook = new Map([...phoneBookABC, ...phoneBookDEF, ...phoneBookDEF2]);
printPhoneBook(phoneBook);
//Print out the full list of names in the combined phone book
console.log(phoneBook.keys());
//Print out the full list of phone numbers in the combined phone book
console.log(phoneBook.values());
//Print out the full list of names and phone numbers in the combined phone book
console.log(phoneBook.entries());