let salaries = {
    Timothy: 35000,
    David: 25000,
    Mary: 55000,
    Christina: 75000,
    James: 43000,
};

//Write a function sumSalaries(salaries) that calculates and returns the total of all salaries
function sumSalaries(salaries) {
    let sum = 0;
    //const keys = Object.keys(salaries);  //O(n)
    for (let salary of Object.values(salaries)) {
        sum += salary;
    }
    // combined is still O(n)
    //return keys.reduce((acc, key) => acc + salaries[key], 0);  //O(n)
    //return Object.values(salaries).reduce((sum, salary) => sum + salary, 0);
    return sum;
}
console.log(sumSalaries(salaries));

//Write a function topEarner(salaries) that calculates and returns the name of the person earning the highest salary
function topEarner(salaries) {
    let maxSalary = 0;
    let topEarner = "";
    for (let [name, salary] of Object.entries(salaries)) {
        if (salary > maxSalary) {
            maxSalary = salary;
            topEarner = name;
        }
    }
    return topEarner;
}

function topEarner2(salaries) {
    const keys = Object.keys(salaries);
    let topEarner = {salary: salaries[keys[0]], name: keys[0] };

    keys.forEach((earner) => {
        if (salaries[earner] > topEarner.salary) {
            topEarner = { salary: salaries[earner], name: earner};
        }
    });
    return topEarner.name;
}
console.log(topEarner(salaries));
console.log(topEarner2(salaries));
