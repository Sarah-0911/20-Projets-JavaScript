import config from './config.js';

const accessKey = config.unsplashAccessKey;

const form = document.querySelector('form');
const userInput = document.querySelector('#search');
const errorMsg = document.querySelector('.error-msg');

let searchQuery = '';
let pageIndex = 1;

const handleSearch = (e) => {
  e.preventDefault();
  imagesList.textContent = '';

  searchQuery = userInput.value;

  if (!searchQuery) {
    errorMsg.textContent = 'Woups, il faut écrire quelque chose.';
    return;
  }
  errorMsg.textContent = '';
  pageIndex = 1;
  fetchData(searchQuery);
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
      throw new Error("Woops, rien de tel dans notre base de données... tentez un mot clé plus précis !");
    }

    const images = data.results;
    createImages(images);

  } catch (error) {
      errorMsg.textContent = error.message;
  };
};

const imagesList = document.querySelector('.images-list');

const createImages = (images) => {
  images.forEach(image => {
    const newImg = document.createElement('img');
    newImg.src = image.urls.regular;
    imagesList.appendChild(newImg);
  });
};

const handleIntersect = (entries) => {
  console.log(entries);
  if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
    pageIndex++;
    fetchData(searchQuery);
  }
};

const observer = new IntersectionObserver(handleIntersect,
{rootMargin: "50%"});
observer.observe(document.querySelector('.infinite-marker'));
console.log(observer);


form.addEventListener('submit', handleSearch);

const scrollToTop = document.querySelector('.scroll-to-top');

const pushToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

scrollToTop.addEventListener('click', pushToTop);
