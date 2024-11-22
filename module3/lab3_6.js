const westley = { name: "Westley", numFingers: 5 };
const rugen = { name: "Count Rugen", numFingers: 6 };
const inigo = {
    firstName: "Inigo",

    greeting(person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName}. `;
    console.log(greeting + this.getCatchPhrase(person));
},
    getCatchPhrase(person) {
    return "Nice to meet you.";
    },
};

inigo.greeting(westley);
inigo.greeting(rugen);

// complete the inigo object by adding a lastName property and including it in the greeting
inigo.lastName = "Montoya";
inigo.greeting = function (person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}. `;
    console.log(greeting + this.getCatchPhrase(person));
};

//Complete getCatchPhrase so that if the person argument has 6 fingers, it instead prints his famous catch phrase to the console.
inigo.getCatchPhrase = function (person) {
    return person.numFingers === 6 ? "You killed my father. Prepare to die.": "Nice to meet you."; //You killed my father. Prepare to die
};

// console.log(    inigo.getCatchPhrase(westley));
// console.log(  inigo.getCatchPhrase(rugen));
//Update getCatchPhrase to use arrow function syntax and a conditional operator
inigo.getCatchPhrase = (person) => person.numFingers === 6 ? "You killed my father. Prepare to die.": "Nice to meet you.";
console.log(    inigo.getCatchPhrase(westley));
console.log(  inigo.getCatchPhrase(rugen));