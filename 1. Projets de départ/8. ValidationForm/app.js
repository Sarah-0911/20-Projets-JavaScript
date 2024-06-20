const form = document.querySelector('form');
const validationIcons = document.querySelectorAll('.icon-verif');
const validationTexts = document.querySelectorAll('.error-msg');

const userInput = document.querySelector('#user');

// const handleForm = (e) => {
//   e.preventDefault();

//   const userNameInput = userName.value;
//   userValidation(userNameInput);
// };


const userValidation = () => {
  if (userInput.value.length >= 3) {
    showValidation({ index: 0, validation: true });
  } else {
    showValidation({ index: 0, validation: false });
  }
};

userInput.addEventListener('blur', userValidation);
userInput.addEventListener('input', userValidation);


const emailInput = document.querySelector('#email');

const emailValidation = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  if (emailRegex.test(emailInput.value)) {
    showValidation({ index: 1, validation: true });
  } else {
    showValidation({ index: 1, validation: false });
  }
};

emailInput.addEventListener('blur', emailValidation);
emailInput.addEventListener('input', emailValidation);

const showValidation = ({index, validation}) => {
  if (validation) {
    validationIcons[index].style.display = 'inline';
    validationIcons[index].src = "ressources/check.svg";
    validationTexts[index].style.display = 'none';
  } else {
    validationIcons[index].style.display = 'inline';
    validationIcons[index].src = "ressources/error.svg";
    validationTexts[index].style.display = 'block';
  }
};

// form.addEventListener('submit', handleForm);
