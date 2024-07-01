import config from './config.js';

const accessKey = config.unsplashAccessKey;

const form = document.querySelector('form');
const userInput = document.querySelector('#search');
const errorMsg = document.querySelector('.error-msg');

const handleForm = (e) => {
  e.preventDefault();
  const userInputValue = userInput.value;

  if (!userInputValue) {
    errorMsg.textContent = 'Woups, il faut écrire quelque chose.'
  }
  fetchUnsplashApi(userInputValue);
};

const fetchUnsplashApi = async(query) => {

  try {
    const url = `https://api.unsplash.com/search/photos/?query=${query}
    &client_id=${accessKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    };

    const data = await response.json();
    const cards = data.results;
    console.log(cards);

    displayCards(cards);

  } catch (error) {
      errorMsg.textContent = error.message;
  };
};

const imagesList = document.querySelector('.images-list');

const displayCards = (cards) => {
  imagesList.textContent = '';

  cards.forEach(result => {
    console.log(result.urls.full);
    const img = document.createElement('img');
    img.src = result.urls.full;
    imagesList.appendChild(img);
  });
};

form.addEventListener('submit', handleForm);
