/*
Users

http://www.api.com/api

GET
/users -> list of users
/users/1 -> return the user with id 1

POST
/users

PUT
/users/1 -> updating info on user with id 1

DELETE
/users/1 -> deleting user with id 1 from DB

*/
//Use the JSONPlaceholder API to fetch a list of posts and log the data to the console using fetch
let posts, z = [];
//const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
const API_URL = 'https://jsonplaceholder.typicode.com';

function fetchCard() {
    fetch(`${API_URL}/posts?_limit=10`)
    .then((response) => response.json())
    .then((resultJSON) => console.log(resultJSON));

    // clone the template
    const template=document.getElementById("card-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.card-title').innerText='My Card Title';
    template.querySelector('.card-text').innerText='lorem ipsum ble bla';
    // include the populated template into the page
    document.querySelector('#card-list').appendChild(template);
}
function addCardParams(item) {
    // clone the template
    const template=document.getElementById("card-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.card-title').innerText=item.title;
    template.querySelector('.card-text').innerText=item.body;
    // include the populated template into the page
    document.querySelector('#card-list').appendChild(template);
}

posts = fetch(`${API_URL}/posts?_limit=10`)
.then((response) => response.json())
.then((resultJSON) => resultJSON.forEach(item => addCardParams(item)))
.catch((error) => console.log(error));

//console.log(posts[1]);
//fetchCard();

//addCardParams('Another Card Title', 'different lorem ipsum text');
// posts.forEach(card => {
//     addCardParams(card.title, card.body);
// });