let car = {
    make: "Porsche",
    model: '911',
    year: 1964,
    description() {
        console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
    }
};
console.log("Start (a)");
car.description(); //works
setTimeout(car.description, 200); //loses the reference,passed as reference so fails
if (0) {
    //a) Fix the setTimeout call by wrapping the call to car.description() inside a function
    setTimeout( function(){ car.description(); }, 2000);
    setTimeout( () => car.description(), 2000);
    //Why does the second call to car.description() fail? How can you fix it?
    // The second call to car.description() fails because the setTimeout function is not bound to the car object.
    // To fix it, you can use the bind method to bind the car.description function to the car object.
    setTimeout(car.description.bind(car), 3000); //works
}
if (0) {
    console.log("Start (b)");
    //b) Change the year for the car by creating a clone of the original and overriding it
    //let newCar = Object({...car});
    //newCar.year = 2020;
    let newCar = { ...car, year: 2023};
    newCar.description();
}
//c) Does the delayed description() call use the original values or the new values from b)? Why?
//The delayed description() call uses the original values because the setTimeout function is not bound to the newCar object.
if (0) {
    console.log("Start (d)");
    //d) Use bind to fix the description method so that it can be called from within setTimeout without a wrapper function
    let newCar2 = Object({...car});
    newCar2.year = 2020;
    newCar2.description = car.description.bind(newCar2);
    newCar2.description();
}
if (0) {
    //e) Change another property of the car by creating a clone and overriding it, and test that setTimeout still uses the bound value from d)
    console.log("Start (e)");
    let newCar3 = Object({...car});
    newCar3.year = 1999;
    newCar3.make = "Toyota";
    newCar3.description = car.description.bind(newCar3);
    newCar3.description();
}



