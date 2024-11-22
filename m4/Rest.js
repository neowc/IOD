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
//https://jsonplaceholder.typicode.com/posts

let posts, z = [];
//const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
const API_URL = 'https://jsonplaceholder.typicode.com';

fetch(`${API_URL}/posts?_limit=3`)
.then((response) => response.json())
.then((resultJSON) => console.log(resultJSON));


// posts = fetch(`${API_URL}/posts?_limit=10`)
// .then((response) => response.json())
// .then((data) => console.log(data))
// .catch((error) => console.log(error));

//console.log(posts[1]);
