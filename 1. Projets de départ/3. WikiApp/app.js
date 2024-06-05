// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector('#search-form');
const input = document.querySelector('.search-input');
const errorMsg = document.querySelector('.error-msg');
const resultsDisplay = document.querySelector('.results-display');
const loader = document.querySelector('.loader');

const handleSubmit = (e) => {
  e.preventDefault();
  if (input.value === '') {
    errorMsg.textContent = 'Wops, veuillez remplir l\'input';
    return;
  } else {
    errorMsg.textContent = '';
    loader.style.display = 'flex';
    wikiAPICall(input.value);
    resultsDisplay.textContent = '';
  }
};

const wikiAPICall = async (searchInput) => {
  const wikiURL = `https://en.wikipedia.org/w/api.php?
  action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`;
  try {
    const response = await fetch(wikiURL);
    if(!response.ok) {
      throw new Error(`${response.status}`);
    };
    const data = await response.json();
    createCards(data.query.search);
  } catch (error) {
    errorMsg.textContent = error;
    loader.style.display = 'none';
  }
};

const createCards = (data) => {
  console.log(data);
  if (!data.length) {
    errorMsg.textContent = 'Wopsy, aucun résultat';
    loader.style.display = 'none';
    return;
  };
  data.forEach(el => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement('div');
    card.classList.add('result-item');
    card.innerHTML = `
      <h3 class="result-title">
      <a href="${url}" target="_blank">${el.title}<a>
      </h3>
      <a href="${url}" class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${el.snippet}</span>
    `;
    resultsDisplay.appendChild(card);
  });
  loader.style.display = 'none';
};

form.addEventListener('submit', handleSubmit);
