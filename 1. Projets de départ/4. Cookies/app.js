const cookieForm = document.querySelector('form');
const inputs = cookieForm.querySelectorAll('.input-group input');

const handleValidation = (e) => {
  if (e.type === 'invalid') {
    e.target.setCustomValidity('Ce champ ne peut être vide.');
  } else if (e.type === 'input') {
    e.target.setCustomValidity('');
  };
};

inputs.forEach(input => {
  input.addEventListener('invalid', handleValidation);
  input.addEventListener('input', handleValidation);
});


const handleForm = (e) => {
  e.preventDefault();
  const newCookie = {};

  inputs.forEach(input => {
    const nameAttribute = input.getAttribute('name');
    newCookie[nameAttribute] = input.value;
  })

  newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  createCookie(newCookie);
  cookieForm.reset();
};

const createCookie = (newCookie) => {

  if (doesCookieExist(newCookie.name)) {
    createToast({ name: newCookie.name, state: 'modifié', color: 'orangered' });
  } else {
    createToast({ name: newCookie.name, state: 'créé', color: 'green' });
  };

  document.cookie = `${encodeURIComponent(newCookie.name)}=${
    encodeURIComponent(newCookie.value)}; expires=${
      newCookie.expires.toUTCString()}`;

  if (cookiesList.children.length) {
    displayCookies();
  }
};

const doesCookieExist = (name) => {

  const cookies = document.cookie.replace(/\s/g, '').split(';');
  const cookiesName = cookies.map(cookie => cookie.split('=')[0]);

  const cookiePresence = cookiesName.find(cookie => cookie ===
    encodeURIComponent(name));

    return cookiePresence;
};

const toastsContainer = document.querySelector('.toasts-container');

const createToast = ({ name, state, color }) => {
  const toastInfo = document.createElement('p');
  toastInfo.classList.add('toast');
  toastInfo.textContent = `Cookie ${name} ${state}.`;
  toastInfo.style.backgroundColor = color;
  toastsContainer.appendChild(toastInfo);

  setTimeout(() => {
    toastInfo.remove();
  }, 2500);
};

const cookiesList = document.querySelector('.cookies-list');
const displayCookieBtn = document.querySelector('.display-cookie-btn');
const infoTxt = document.querySelector('.info-txt');

let lock = false;

const displayCookies = () => {
  if (cookiesList.children.length) cookiesList.textContent = '';

  const cookies = document.cookie.replace(/\s/g, '').split(';').reverse();

  if (!cookies[0]) {
    if (lock) return;

    lock = true;
    infoTxt.textContent = 'Pas de cookies à afficher, créez-en un!';

    setTimeout(() => {
      infoTxt.textContent = '';
      lock = false;
    }, 1500);
    return;
  }
  createElements(cookies);
};

const createElements = (cookies) => {
  cookies.forEach(cookie => {
    const formatCookie = cookie.split('=');
    const listItem = document.createElement('li');
    const name = decodeURIComponent(formatCookie[0]);
    const value = decodeURIComponent(formatCookie[1]);

    listItem.innerHTML = `
    <p><span>Nom</span> : ${name}</p>
    <p><span>Value</span> : ${value}</p>
    <button>X</button>
    `;
    listItem.querySelector('button').addEventListener('click', (e) => {
      createToast({ name: name, state: 'supprimé', color: 'crimson' });
      document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
      e.target.parentElement.remove();
    })
    cookiesList.appendChild(listItem);
  });
};

cookieForm.addEventListener('submit', handleForm);
displayCookieBtn.addEventListener('click', displayCookies);
