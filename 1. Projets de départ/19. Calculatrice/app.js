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

  if (calculatorData.displayedResult) {
    calculationDisplay.textContent = '';
    calculatorData.calculation = '';
    calculatorData.displayedResult = false;
  }

  calculatorData.calculation += buttonValue;
  resultDisplay.textContent = calculatorData.calculation;
};

const handleOperators = (e) => {
  const buttonValue = e.target.getAttribute('data-action');

  if (calculatorData.displayedResult) {
    calculationDisplay.textContent = '';
    calculatorData.calculation = calculatorData.result += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
    calculatorData.displayedResult = false;
    return;
  }
  else if (!calculatorData.calculation && buttonValue === '-') {
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
  }
};

const decimalButton = document.querySelector("[data-action='.']")

decimalButton.addEventListener("click", handleDecimal);

function handleDecimal (){
  if(!calculatorData.calculation) return;

  let lastSetOfNumbers = "";

  for(let i = calculatorData.calculation.length - 1; i >= 0; i--) {
    if(/[\/+*-]/.test(calculatorData.calculation[i])){
      break;
    }
    else {
      lastSetOfNumbers += calculatorData.calculation[i];
    }
  }

  if(!lastSetOfNumbers.includes(".")) {
    calculatorData.calculation += ".";
    resultDisplay.textContent = calculatorData.calculation;
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
    resultDisplay.textContent = calculatorData.result;
    calculationDisplay.textContent = calculatorData.calculation;
    calculatorData.displayedResult = true;
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

  const operandsInfo = getIndexes(operatorIndex, calculation);

  let currentOperationResult;

  switch (operator) {
    case '+':
      currentOperationResult = Number(operandsInfo.leftOperand) + Number(operandsInfo.rightOperand);
      break;
    case '-':
      currentOperationResult = Number(operandsInfo.leftOperand) - Number(operandsInfo.rightOperand);
      break;
    case '/':
      currentOperationResult = Number(operandsInfo.leftOperand) / Number(operandsInfo.rightOperand);
      break;
    case '*':
      currentOperationResult = Number(operandsInfo.leftOperand) * Number(operandsInfo.rightOperand);
      break;
  }

  let updatedCalculation = calculation.replace(calculation.slice(operandsInfo.startIntervalIndex, operandsInfo.lastRightOperandCharacter), currentOperationResult.toString());

  if (/[\/*+-]/.test(updatedCalculation.slice(1))) {
    customEval(updatedCalculation);
  }

  if (updatedCalculation.includes('.')) {
    if (updatedCalculation.split('.')[1].length === 1) {
      return Number(updatedCalculation).toString();
    }
    else if (updatedCalculation.split('.')[1].length > 1) {
      return Number(updatedCalculation).toFixed(2).toString();
    }
  } else {
    return updatedCalculation;
  }
};

const getIndexes = (operatorIndex, calculation) => {
  let rightOperand = '';
  let lastRightOperandCharacter;

  for (let i = operatorIndex + 1; i <= calculation.length; i++) {
    if (i === calculation.length) {
      lastRightOperandCharacter = calculation.length;
      break;
    }
    else if (/[\/*+-]/.test(calculation[i])) {
      lastRightOperandCharacter = i;
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
    lastRightOperandCharacter
  }
};

const resetButton = document.querySelector('[data-action="c"]');
const clearEntryButton = document.querySelector('[data-action="ce"]');

const handleReset = () => {
  calculatorData.calculation = '';
  calculatorData.result = '';
  calculatorData.displayedResult = false;
  calculationDisplay.textContent = '';
  resultDisplay.textContent = '0';
};

const clearEntry = () =>  {
  if (!calculatorData.displayedResult) {
    if (resultDisplay.textContent[0] === '0') return;
    else if (resultDisplay.textContent.length === 1) {
      resultDisplay.textContent = '0';
    }
    else {
      calculatorData.calculation = calculatorData.calculation.slice(0, -1);
    }
  }
  resultDisplay.textContent = calculatorData.calculation;
};

digitsBtns.forEach(button => button.addEventListener('click', handleDigits));
operatorsBtns.forEach(button => button.addEventListener('click', handleOperators));
equalBtn.addEventListener('click', showResult);
resetButton.addEventListener('click', handleReset);
clearEntryButton.addEventListener('click', clearEntry);
