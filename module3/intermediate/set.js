// Create a Set with the names of your classmates:
// const classmates = new Set(['Alice', 'Bob', 'Charlie', 'Alice', 'Dave']);
// Check how many unique classmates you have using .size.
// Add a new classmate to the Set.
// Check if 'Charlie' is in the Set.
// Remove 'Alice' from the Set.
// Bonus Task: Iterate through the Set using both for..of and forEach() to print each classmate.
function classmate_set(){

    const classmates = new Set(['Alice', 'Bob', 'Charlie', 'Alice', 'Dave']);
    console.log(classmates.size); // 3

    classmates.add('Eve');
    console.log(classmates.has('Charlie')); // true

    classmates.delete('Alice');

    for (const name of classmates) {
        console.log("1" + name);
    }

    classmates.forEach((x) => {console.log("2" + x) });
}

classmate_set();

