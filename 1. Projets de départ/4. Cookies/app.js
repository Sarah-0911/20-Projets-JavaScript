const form = document.querySelector('form');
const inputs = form.querySelectorAll('.input-group input');
const displayCookieBtn = form.querySelector('.display-cookie-btn');

const handleValidation = (e) => {
  console.log(e);
};

inputs.forEach(input => {
  input.addEventListener('invalid', handleValidation)
  input.addEventListener('input', handleValidation)
});


// const handleSubmit = () => {
//   e.preventDefault();
//   createCookie();
// };

// const createCookie = (e) => {
//   const createCookieBtn = form.querySelector('.create-cookie-btn');
//   console.log('coucou');
// };

// form.addEventListener('submit', handleSubmit);
// form.addEventListener('click', displayCookie);
