const artist = {
    name: "Van Gogh",
    portfolio:[
    {title: "portrait", url:"https://collectionapi.metmuseum.org/api/collection/v1/iiif/436532/1671316/main-image"},
    {title: "sky", url:"https://mymodernmet.com/wp/wp-content/uploads/2020/11/White-house-night-van-goh-worldwide-2.jpg" },
    ]
}

const heroPlaceholder = document.querySelector('.card-list');
const template = document.getElementById('card-template');
const fetchingNode = document.importNode(template.content, true);
heroPlaceholder.replaceWith(fetchingNode);
function createListWithInnerHTML(heroes) {
    const rows = heroes.map(hero => {
      return `<li>
          <div class="card">
            <div class="card-content">
              <div class="content">
                <div class="name">${hero.name}</div>
                <div class="description">${hero.description}</div>
              </div>
            </div>
          </div>
        </li>`;
        
});
}
const html = `<ul>${rows.join()}</ul>`;
heroPlaceholder.innerHTML = html;
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
artist.forEach(card => {
    card.portfolio.forEach(portfolioItem => {
        addCardParams(portfolioItem.title, portfolioItem.url);
    });
    //addCardParams(card.name, card.age);
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