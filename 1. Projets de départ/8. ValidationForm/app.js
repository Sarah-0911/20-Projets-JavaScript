const form = document.querySelector('form');
const validationIcons = document.querySelectorAll('.icon-verif');
const validationTexts = document.querySelectorAll('.error-msg');

const userName = document.querySelector('#user');


// const handleForm = (e) => {
//   e.preventDefault();

//   const userNameInput = userName.value;
//   userValidation(userNameInput);
// };


const userValidation = () => {
  if (userName.value.length >= 3) {
    validationIcons[0].style.display = 'inline';
    validationIcons[0].src = "ressources/check.svg";
    validationTexts[0].style.display = 'none';
  } else {
    validationIcons[0].style.display = 'inline';
    validationIcons[0].src = "ressources/error.svg";
    validationTexts[0].style.display = 'block';
  }
};

// const checkValidationIcon = (isValid) => {
//   if (isValid) {
//     icon.src = "ressources/check.svg";
//   } else {
//     icon.src = "ressources/error.svg";
//   }
// };

userName.addEventListener('blur', userValidation);
userName.addEventListener('input', userValidation);
// form.addEventListener('submit', handleForm);
