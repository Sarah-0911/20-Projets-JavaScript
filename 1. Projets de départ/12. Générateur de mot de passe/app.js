const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
console.log(checkboxInputs);

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

console.log(charactersSet);

// const regexCheckboxes = {
//   lowerChars: /^[a-z]+$/,
//   upperChars: /^[A-Z]+$/,
//   symbols: /^[^a-zA-Z0-9\s]+$/,
//   numbers: /^[0-9]+$/
// };

// const handleCheckboxes = () => {
//   checkboxInputs.forEach(checkbox => {
//     for (const prop in regexCheckboxes) {
//       if ((checkbox.checked && regexCheckboxes.prop.test(charactersSet.prop))) {
//         console.log('yes!');
//       }
//     }
//   })
// }

// handleCheckboxes()
