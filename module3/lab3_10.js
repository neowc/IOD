function Person(name, age) {
  this.name = name;
  this.age = age;
  this.human = true;
}
// Create a new person using the constructor function and store it in a variable
const person1 = new Person("John", 30);
console.log(person1);
// console.log(person1.name);
// console.log(person1.age);
// console.log(person1.human);
// Create a second person using different name and age values and store it in a separate variable
const person2 = new Person("Jane", 25);
console.log(person2);
// Rewrite the constructor function as a class called PersonClass and use it to create a third person using different name and age values. Print it to the console as well
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;
  }
}
const person3 = new PersonClass("Bob", 40);
console.log(person3);
// Add a canDrive method to both the constructor function and the class that returns true if the person is old enough to drive
Person.prototype.canDrive = function () {
  return this.age >= 16;
};

PersonClass.prototype.canDrive = function () {
  return this.age >= 16;
};
console.log("person1 can drive " + person1.canDrive());
console.log("person3 can drive " + person3.canDrive());

