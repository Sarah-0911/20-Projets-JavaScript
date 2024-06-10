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
  console.log(newCookie);

  newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  createCookie(newCookie);
};

const createCookie = (newCookie) => {
  // const createCookieBtn = form.querySelector('.create-cookie-btn');
  // console.log('coucou');
};

cookieForm.addEventListener('submit', handleForm);
