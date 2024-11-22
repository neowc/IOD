console.log(camelCase('margin-left')) // marginLeft
console.log(camelCase('background-image')) // backgroundImage
console.log(camelCase('display')) // display

//Write a function camelCase(cssProp) that changes dash-separated CSS properties like 'margin-left' into camel-cased 'marginLeft'.
function camelCase(cssProp) {
  let arr = cssProp.split('-');
  let camelCased = arr[0];
  for (let i = 1; i < arr.length; i++) {
    camelCased += arr[i][0].toUpperCase() + arr[i].slice(1);
  }
  return camelCased;
}
//Create variants of the camelCase function that use different types of for loops
function camelCase2(cssProp) {
  let arr = cssProp.split('-');
  let camelCased = arr[0];
  let i = 1;
  while (i < arr.length) {
    camelCased += arr[i][0].toUpperCase() + arr[i].slice(1);
    i++;
  }
  return camelCased;
}
function camelCase3(cssProp) {
  let arr = cssProp.split('-');
  let camelCased = arr[0];
  arr.slice(1).forEach(word => {
    camelCased += word[0].toUpperCase() + word.slice(1);
  });
  return camelCased;
}
console.log(camelCase2('margin-left')) // marginLeft
console.log(camelCase2('background-image')) // backgroundImage
console.log(camelCase2('display')) // display
console.log(camelCase3('margin-left')) // marginLeft
console.log(camelCase3('background-image')) // backgroundImage
console.log(camelCase3('display')) // display
// modify camelCase function with and without the conditional operator.
function camelCase4(cssProp) {
  let arr = cssProp.split('-');
  let camelCased = arr[0];
  for (let i = 1; i < arr.length; i++) {
    camelCased += (i === 1 ? '' : arr[i][0].toUpperCase()) + arr[i].slice(1);
  }
  return camelCased;
}
console.log(camelCase4('margin-left')) // marginLeft
console.log(camelCase4('background-image')) // backgroundImage
console.log(camelCase4('display')) // display