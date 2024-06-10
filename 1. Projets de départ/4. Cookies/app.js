const cookieForm = document.querySelector('form');
const inputs = cookieForm.querySelectorAll('.input-group input');
// const displayCookieBtn = cookieForm.querySelector('.display-cookie-btn');

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
};

const doesCookieExist = (name) => {

  const cookies = document.cookie.replace(/\s/g, '').split(';');
  const cookiesName = cookies.map(cookie => cookie.split('=')[0]);

  const cookiePresence = cookiesName.find(cookie => cookie ===
  encodeURIComponent(name));

  return cookiePresence;
}

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
}

cookieForm.addEventListener('submit', handleForm);
