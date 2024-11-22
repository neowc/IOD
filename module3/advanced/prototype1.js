// Create a constructor function Car that initializes a car with properties like make, model, and year.
function Car(make, model, year) {  //use captialised func name for constructor
    this.make = make;
    this.model = model;
    this.year = year;
}

// Add a method getDetails to Car.prototype that returns a string describing the car.

Car.prototype.getDetails = function() {
    //console.log(`This car is made in ${this.year} with make of ${this.make} for model ${this.model}`);
    return `${this.year} ${this.make} ${this.model}`;
};

let newCar1 = new Car("Toyota", "Camry", 2010);
let newCar2 = new Car("Honda", "Civic", 2000);
console.log(newCar1.getDetails());