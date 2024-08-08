const calculatorData = {
  calculation: '',
  result: '',
  displayedResult: false
};

const buttons = [...document.querySelectorAll('button[data-action]')];

const digitsBtns = buttons.filter(button => /[0-9]/.test(button.getAttribute('data-action')));
const operatorsBtns = buttons.filter(button => /[\/*+-]/.test(button.getAttribute('data-action')));
const equalBtn = document.querySelector('[data-action="="]');

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

const showResult = () => {
  if(/[\/*+.-]/.test(calculatorData.calculation.slice(-1))) {
    calculationDisplay.textContent = 'Terminez le calcul par un chiffre';
    setTimeout(() => {
      calculationDisplay.textContent = '';
    }, 2500)
    return;
  }
  else if (!calculatorData.displayedResult) {
    calculatorData.result = customEval(calculatorData.calculation);
  }
};


const customEval = (calculation) => {
  if (!/[\/*+-]/.test(calculation.slice(1))) return calculation;

  let operator;
  let operatorIndex;

  if (/[\/*]/.test(calculation.slice(1))) {
    for (let i = 1; i < calculation.length; i++) {
      if (/[\/*]/.test(calculation[i])) {
        operator = calculation[i];
        operatorIndex = i;
        break;
      }
    }
  }
  else {
    for (let i = 1; i < calculation.length; i++) {
      if (/[+-]/.test(calculation[i])) {
        operator = calculation[i];
        operatorIndex = i;
        break;
      }
    }
  }

  console.log({operator, operatorIndex});
  const operands = getIndexes(operatorIndex, calculation);
  console.log(operands);

};

const getIndexes = (operatorIndex, calculation) => {
  let rightOperand = '';
  let endIntervalIndex;

  for (let i = operatorIndex + 1; i <= calculation.length; i++) {
    if (i === calculation.length) {
      endIntervalIndex = calculation.length;
      break;
    }
    else if (/[\/*+-]/.test(calculation[i])) {
      endIntervalIndex = i;
      break;
    }
    else {
      rightOperand += calculation[i];
    }
  }

  let leftOperand = '';
  let startIntervalIndex;


  for (let i = operatorIndex - 1; i >= 0; i--) {
    if (i === 0 && /[-]/.test(calculation[i])) {
      startIntervalIndex = 0;
      leftOperand += '-';
      break;
    }
    else if (i === 0) {
      startIntervalIndex = 0;
      leftOperand += calculation[i];
      break;
    }
    else if (/[\/*+-]/.test(calculation[i])) {
      startIntervalIndex = i + 1;
      break;
    }
    else {
      leftOperand += calculation[i];
    }
  }

  leftOperand = leftOperand.split('').reverse().join('');

  return {
    leftOperand, //équivaut à { leftOperand: leftOperand, (...) };
    rightOperand,
    startIntervalIndex,
    endIntervalIndex
  }
};

customEval('459*6')


digitsBtns.forEach(button => button.addEventListener('click', handleDigits));
operatorsBtns.forEach(button => button.addEventListener('click', handleOperators));
equalBtn.addEventListener('click', showResult);



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
