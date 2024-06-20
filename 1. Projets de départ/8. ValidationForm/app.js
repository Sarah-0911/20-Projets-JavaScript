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
  };
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
  };
};

emailInput.addEventListener('blur', emailValidation);
emailInput.addEventListener('input', emailValidation);


const passwordInput = document.querySelector('#password');

const passwordVerification = {
  length: false,
  symbol: false,
  number: false
};

const regexList = {
  symbol: /[^a-zA-Z0-9\s]/,
  number: /[0-9]/
};

let passwordValue;

const passwordValidation = () => {
  passwordValue = passwordInput.value;
  let validationResult = 0;
  for (const prop in passwordVerification) {

    if (prop === 'length') {
      if (passwordValue.length < 6) {
        passwordVerification.length = false;
      } else {
        passwordVerification.length = true;
        validationResult++;
      }
      continue;
    }

    if(regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } else {
      passwordVerification[prop] = false;
    }
  }

  if (validationResult !== 3) {
    showValidation({ index: 2, validation: false })
  } else {
    showValidation({ index: 2, validation: true })
  };

  passwordStrength();
};

const lines = document.querySelectorAll('.lines div');

const passwordStrength = () => {
  const passwordLength = passwordInput.value.length;
  if (!passwordLength) {
    addLines(0);
  }
  else if (passwordLength > 9 && passwordVerification.symbol &&
  passwordVerification.number) {
    addLines(3);
  }
  else if (passwordLength > 6 && passwordVerification.symbol ||
  passwordVerification.number) {
    addLines(2);
  }
  else {
    addLines(1);
  };
};

const addLines = (numberOfLines) => {
  lines.forEach((line, index) => {
    if (index < numberOfLines) {
      line.style.display = 'block';
    } else {
      line.style.display = 'none';
    }
  })
};

passwordInput.addEventListener('blur', passwordValidation);
passwordInput.addEventListener('input', passwordValidation);


const confirmInput = document.querySelector('#psw-confirmation');

if (validationIcons[3].style.display === 'inline') {
  confirmPassword()
};

const confirmPassword = () => {
  if (!confirmInput.value && !passwordInput.value) {
    validationIcons[3].style.display = 'none';
  }
  else if (confirmInput.value !== passwordInput.value) {
    showValidation({ index: 3, validation: false })
  }
  else {
    showValidation({ index: 3, validation: true })
  }
};

confirmInput.addEventListener('blur', confirmPassword);
confirmInput.addEventListener('input', confirmPassword);


const showValidation = ({index, validation}) => {
  if (validation) {
    validationIcons[index].style.display = 'inline';
    validationIcons[index].src = "ressources/check.svg";
    if (validationTexts[index]) validationTexts[index].style.display = 'none';
  } else {
    validationIcons[index].style.display = 'inline';
    validationIcons[index].src = "ressources/error.svg";
    if (validationTexts[index]) validationTexts[index].style.display = 'block';
  }
};

// form.addEventListener('submit', handleForm);
