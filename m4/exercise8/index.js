

var moment = require('moment'); // require
moment().format();

function displaytime() {
    // var now = moment();
    // var time = now.format('MMMM Do YYYY, h:mm:ss a');
    // document.getElementById('time').innerHTML = time;
    // console.log(time);

    // clone the template
    const template=document.getElementById("card-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.card-title').innerText=time;
    template.querySelector('.card-text').innerText=time;
    // include the populated template into the page
    document.querySelector('#card-list').appendChild(template);
}

displaytime();


moment().format('MMMM Do YYYY, h:mm:ss a'); // November 23rd 2024, 3:30:19 pm
moment().format('dddd');                    // Saturday
moment().format("MMM Do YY");               // Nov 23rd 24
moment().format('YYYY [escaped] YYYY');     // 2024 escaped 2024
moment().format();                          // 2024-11-23T15:30:19+08:00