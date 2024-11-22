let globalVariableCat = "cat";
function myFunction() {
    let localVariableDog = "dog";
    return "global function with local scope variable " + localVariableDog;
}
console.log(localVariableDog); // ReferenceError: localVariableDog is not defined

// globalEnvironment = {
//     environmentRecord: {
//     globalVariableCat: 'cat', // has no access to localVariableDog
//     myFunction: <reference to function object>,
//     }
//     outer: null // there is no parent environment here
// }

// localMyFunctionEnvironment = {
//     environmentRecord: {
//     localVariableDog: 'dog'
//     },
//     outer: globalEnvironment // can still access everything in global
// }
