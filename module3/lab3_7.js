const basketballGame = {
  score: 0,
  freeThrow() {
    this.score++;
    return this;
  },
  basket() {
    this.score += 2;
    return this;
  },
  threePointer() {
    this.score += 3;
    return this;
  },
  halfTime() {
    console.log("Halftime score is " + this.score);
    return this;
  },
};
//modify each of the above object methods to enable function chaining as below:
basketballGame.basket().freeThrow().freeThrow().basket().threePointer().halfTime();
// Add a new method to print the full time final score
basketballGame.fullTime = function () {
  console.log("Fulltime score is " + this.score);
  return this;
};
// Add a new object property to keep track of the number of fouls and a method to increment it, similar but separate to the score.
// Include the foul count in the half time and full time console messages
basketballGame.fouls = 0;
basketballGame.foul = function () {
  this.fouls++;
  return this;
};
basketballGame.fullTime = function () {
    console.log("Fulltime score is " + this.score, "number of fouls " + this.fouls);
    return this;
};
basketballGame.halfTime = function () {
    console.log("Halftime score is " + this.score, "number of fouls " + this.fouls);
    return this;
};
// Test your object by chaining all the method calls together in different combinations
basketballGame.basket().freeThrow().foul().freeThrow().basket().foul().threePointer().halfTime();