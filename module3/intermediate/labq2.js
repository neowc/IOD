// Create a function truncate(str, max) that truncates a given string of text if its total length is greater than the max length. It should return either the truncated text, with an ellipsis (…) added to the end if it was too long, or the original text otherwise. b) Write another variant of the truncate function that uses a conditional operator.
function truncate(str, max) {
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
}
console.log(truncate("What I'd like to tell on this topic is:", 20));
console.log(truncate("Hi everyone!", 20));
