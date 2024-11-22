function makeCounter() {
  let currentCount = 0;
  return function() {
    currentCount++;
    console.log(currentCount)
    return currentCount;
  };
}

let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

//Create a second counter counter2 using the makeCounter function and test to see if it remains independent to counter1
let counter2 = makeCounter();
counter2(); // 1
counter2(); // 1

counter1(); // ?
counter1(); // ?

//Modify makeCounter so that it takes an argument startFrom specifying where the counter starts from (instead of always starting from 0)
function makeCounter2(startFrom) {
  let currentCount = startFrom;
  return function() {
    currentCount++;
    console.log(currentCount)
    return currentCount;
  };
}
let counter3 = makeCounter2(5);
counter3(); // 6
counter3(); // 7
let counter4 = makeCounter2(100);
counter4(); // 101
counter4(); // 102

//Modify makeCounter to take another argument incrementBy, which specifies how much each call to counter() should increase the counter value by
function makeCounter3(startFrom, incrementBy) {
  let currentCount = startFrom;
  return function() {
    currentCount += incrementBy;
    console.log(currentCount)
    return currentCount;
  };
}
let counter5 = makeCounter3(948, 3);
counter5();
counter5();

