console.log('client side js file loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //dont refresh the page
    const location = search.value;
    const url = 'http://localhost:3000/weather?address='+location;
    
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    fetch(url).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error;
                }else{ 
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});