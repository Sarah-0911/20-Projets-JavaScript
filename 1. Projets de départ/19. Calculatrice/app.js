const calculatorData = {
  calculation: '',
  result: '',
  displayedResult: false
};

const buttons = [...document.querySelectorAll('button[data-action]')];

const digitsBtns = buttons.filter(button => /[0-9]/.test(button.getAttribute('data-action')));
const operatorsBtns = buttons.filter(button => /[\/*+-]/.test(button.getAttribute('data-action')));

const calculationDisplay = document.querySelector('.calculation');
const resultDisplay = document.querySelector('.result');


const handleDigits = (e) => {
  const buttonValue = e.target.getAttribute('data-action');

  if (calculatorData.calculation === '0') calculatorData.calculation = '';

  calculatorData.calculation += buttonValue;
  resultDisplay.textContent = calculatorData.calculation;

  console.log(calculatorData.calculation);

};

const handleOperators = (e) => {
  const buttonValue = e.target.getAttribute('data-action');

  if (!calculatorData.calculation && buttonValue === '-') {
    calculatorData.calculation += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
    return;
  }
  else if (!calculatorData.calculation || calculatorData.calculation === '-') return;
  else if (calculatorData.calculation.slice(-1).match(/[\/*+-]/)) {
    calculatorData.calculation = calculatorData.calculation.slice(0, -1) + buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
  }
  else {
    calculatorData.calculation += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
    console.log(calculatorData.calculation);
  }
};


digitsBtns.forEach(button => button.addEventListener('click', handleDigits));
operatorsBtns.forEach(button => button.addEventListener('click', handleOperators));




//----------------------------------------------------------------------------

const handleData = (e) => {
  const data = e.target.getAttribute('data-action');
  operator = isNaN(data);
  console.log(operator);

  // calculateData(previousInput, operator, currentInput);
  displayData(data);
};


// const calculateData = (a, operator, b) => {
//   switch (operator) {
//     case '+':
//       return a + b;
//     case '-':
//       return a - b;
//     case '*':
//       return a * b;
//     case '/':
//       return a / b;
//     default:
//       return 0;
//   }
// };

// const displayData = (data) => {
//   if (data !== 'c' && data !== 'ce') {
//     // resetCalculator();
//     digitsArray.push(data);
//     resultDisplay.textContent = digitsArray.join('');
//   }
//   if (data === '=') {
//     calculationDisplay.textContent = digitsArray.join('');
//     resultDisplay.textContent = 0;
//   }
// };

// buttons.forEach(button => button.addEventListener('click', handleData));
