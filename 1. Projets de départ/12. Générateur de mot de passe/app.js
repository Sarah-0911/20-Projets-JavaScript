const passwordContent = document.querySelector('.password-content');
const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
const range = document.querySelector('#range');
const rangeLabel = document.querySelector('.range-group label');
const generateBtn = document.querySelector('.generate-password-btn');
const errorMsg = document.querySelector('.error-msg');
const copyBtn = document.querySelector('.copy-btn');
let passwordLength = range.value;

const getRandomNumber = (min, max) => {
  let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
  randomNumber = randomNumber / Math.pow(2, 32);
  //32 bit binary number can have 2³² values => 4294967296;

  return Math.floor(randomNumber * (max - min + 1) + min);
};
// console.log(getRandomNumber(5, 10));

const addASet = (fromCode, toCode) => {
  let charactersList = '';
  for (let i = fromCode; i <= toCode; i++) {
    charactersList += String.fromCharCode(i);
  }
  return charactersList;
};

const charactersSet = {
  lowerChars: addASet(97,122),
  upperChars: addASet(65,90),
  numbers: addASet(48,57),
  symbols: addASet(33,47) + addASet(58,64) + addASet(91,96) + addASet(123,126)
};

const createPassword = () => {
  const checkedDataSets = checkedSets();

  if (!checkedDataSets.length) {
    errorMsg.textContent = 'Au moins une case doit être cochée !';
    return;
  } else errorMsg.textContent = '';

  const concatenatedDataSets = checkedDataSets.join('');

  let password = '';
  let passwordBase = [];

  // caractères de base cochés
  for (let i = 0; i < checkedDataSets.length; i++) {
    passwordBase.push(checkedDataSets[i][getRandomNumber(0, checkedDataSets[i].length - 1)]);
  }

  // reste du mdp
  for (let i = checkedDataSets.length; i < passwordLength; i++) {
    password += concatenatedDataSets[getRandomNumber(0, concatenatedDataSets.length - 1)];
  }

  // mélange des 2
  passwordBase.forEach((item, index) => {
    const randomIndex = getRandomNumber(0, password.length);
    password = password.slice(0, randomIndex) + passwordBase[index] + password.slice(randomIndex);
  })

  passwordContent.textContent = password;
};

const checkedSets = () => {
  const checkedSets = [];

  checkboxes.forEach(checkbox => {
    return checkbox.checked && checkedSets.push(charactersSet[checkbox.id]);
  });
  return checkedSets;
};

const handleRange = (e) => {
  passwordLength = e.target.value;
  rangeLabel.textContent = `Taille du mot de passe: ${passwordLength}`;
};

let locked = false;

const copyPassword = () => {
  if (locked) return;
  locked = true;

  navigator.clipboard.writeText(passwordContent.textContent);
  copyBtn.classList.add('active');

  setTimeout(() => {
    copyBtn.classList.remove('active');
    locked = false;
  }, 600);
};

range.addEventListener('input', handleRange);
generateBtn.addEventListener('click', createPassword);
copyBtn.addEventListener('click', copyPassword);
