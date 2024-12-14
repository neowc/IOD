const data = [
    {name: 'bob', age: 23},
    {name: 'alice', age: 39}
]

function addCard() {
    // clone the template
    const template=document.getElementById("card-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.card-title').innerText='My Card Title';
    template.querySelector('.card-text').innerText='lorem ipsum ble bla';
    // include the populated template into the page
    document.querySelector('#card-list').appendChild(template);
}
addCard();
// addCard();

function addCardParams(title, text) {
    // clone the template
    const template=document.getElementById("card-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.card-title').innerText=title;
    template.querySelector('.card-text').innerText=text;
    // include the populated template into the page
    document.querySelector('#card-list').appendChild(template);
}
//addCardParams('Another Card Title', 'different lorem ipsum text');
data.forEach(card => {
    addCardParams(card.name, card.age);
});
//++++++++++++++++++++++++++++++++++++++++++++++++
// const cardList = document.getElementById('card-list');
// const cardTemplate = document.getElementById('card-template');
// data.forEach(card => {
//     const cardElement = cardTemplate.content.cloneNode(true);
//     cardElement.querySelector('.card-title').textContent = card.name;
//     cardElement.querySelector('.card-text').textContent = card.age;
//     cardList.appendChild(cardElement);
// });

//++++++++++++++++++++++++++++++++++++++++++++++++
// const cards = [
//     { title: 'Card 1', description: 'This is card 1' },
//     { title: 'Card 2', description: 'This is card 2' },
//     { title: 'Card 3', description: 'This is card 3' },
//     { title: 'Card 4', description: 'This is card 4' },
//     { title: 'Card 5', description: 'This is card 5' }
// ];
// cards.forEach(card => {
//     const cardElement = cardTemplate.content.cloneNode(true);
//     cardElement.querySelector('.card-title').textContent = card.title;
//     cardElement.querySelector('.card-text').textContent = card.description;
//     cardList.appendChild(cardElement);
// });