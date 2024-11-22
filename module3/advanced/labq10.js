//The below fetchURLData uses fetch to check the response for a successful status code,
//and returns a promise containing the JSON sent by the remote server if successful or an error if it failed.
//(To run this code in a node.js environment, follow the instructions in the comments before the function.)
// run 'npm init' and accept all the defaults
// run 'npm install node-fetch'
// run 'npm pkg set type=module'
import fetch from 'node-fetch'
globalThis.fetch = fetch
function fetchURLData(url) {
    let fetchPromise = fetch(url).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    });

    return fetchPromise;
}
// fetchURLData('https://jsonplaceholder.typicode.com/todos/2')
//     .then(data => console.log(data))
//     .catch(error => console.error(error.message));

//a)  Write a new version of this function (fetchWithAsyncAwait) so that it uses async/await instead of .then().

async function fetchWithAsyncAwait(url) {
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

// fetchWithAsyncAwait('https://jsonplaceholder.typicode.com/todos/5')
//     .then(data => console.log(data))
//     .catch(error => console.error(error.message));

//b) Test both functions with invalid URLs
fetchWithAsyncAwait('https://www.google.com')
    .then(data => console.log(data))
    .catch(error => console.error(error.message));

// c) Extend your new function to accept an array of URLs and fetch all of them, using Promise.all to combine the results
// into a single array. Print the array of results once, after all the data has been fetched.

function fetchWithPromiseAll(urls) {
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    return Promise.all(promises);
}
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3'
];
// fetchWithPromiseAll(urls)
//     .then(results => console.log(results))
//     .catch(error => console.error(error));