let teamSports = ['Hockey', 'Cricket', 'Volleyball'];  //array passed as ref
let dog1 = 'Bingo';  //string passed by value
let cat1 = { name: 'Fluffy', breed: 'Siberian' };  //obj passed by ref

// Create a new moreSports variable equal to teamSports and add some new sport values to it (using push and unshift)
let moreSports = teamSports.slice();
moreSports.push('Football');
moreSports.unshift('Basketball');
console.log(moreSports);

// Create a new dog2 variable equal to dog1 and give it a new value
let dog2 = dog1;
dog2 = 'Spot';
console.log(dog1);
console.log(dog2);
// Create a new cat2 variable equal to cat1 and change its name property
let cat2 = cat1;
cat2.name = 'Whiskers';
console.log(cat1);
console.log(cat2);

// Change the way the moreSports and cat2 variables are created to ensure the originals remain independent
moreSports = [...teamSports, 'Football', 'Basketball'];
cat2 = { ...cat1, name: 'Whiskers' };
console.log(teamSports,moreSports);
console.log(cat1,cat2);

