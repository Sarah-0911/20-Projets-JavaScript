const passwordContent = document.querySelector('.password-content');
const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
const range = document.querySelector('#range');
const rangeLabel = document.querySelector('.range-group label');
const generateBtn = document.querySelector('.generate-password-btn');
const errorMsg = document.querySelector('.error-msg');

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
};

const checkedSets = () => {
  const checkedSets = [];

  checkboxes.forEach(checkbox => {
    return checkbox.checked && checkedSets.push(charactersSet[checkbox.id])
  });
  return checkedSets;
};

console.log(checkedSets());


const handleRange = (e) => {
  rangeLabel.textContent = `Taille du mot de passe: ${e.target.value}`;
};

range.addEventListener('input', handleRange);
generateBtn.addEventListener('click', createPassword);
