import config from './config.js';

const accessKey = config.unsplashAccessKey;

const form = document.querySelector('form');
const userInput = document.querySelector('#search');
const errorMsg = document.querySelector('.error-msg');

// let searchQuery = 'random';
let pageIndex = 1;

const handleForm = (e) => {
  e.preventDefault();
  const userInputValue = userInput.value;

  if (!userInputValue) {
    errorMsg.textContent = 'Woups, il faut écrire quelque chose.'
  }
  fetchData(userInputValue);
};

const fetchData = async(query) => {
  try {
    const url = `https://api.unsplash.com/search/photos/?page=${pageIndex}&
    per_page=30&query=${query}&client_id=${accessKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    };

    const data = await response.json();

    if (!data.total) {
      imagesList.textContent = '';
      throw new Error("Woopsy, rien de tel dans notre base de données... tentez un mot clé plus précis !");
    }

    const images = data.results;
    createImages(images);

  } catch (error) {
      errorMsg.textContent = error.message;
  };
};

const imagesList = document.querySelector('.images-list');

const createImages = (images) => {
  imagesList.textContent = '';

  images.forEach(image => {
    const newImg = document.createElement('img');
    newImg.src = image.urls.regular;
    imagesList.appendChild(newImg);
  });
};

form.addEventListener('submit', handleForm);
