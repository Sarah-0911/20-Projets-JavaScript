const buttons = document.querySelectorAll('button');
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');

const handleData = (e) => {
  const data = e.target.getAttribute('data-action');
  calculData(data);
  displayData(data);
};


const numbers = [];
const calculData = (data) => {
  numbers.push(data === parseInt('1') || data === parseInt('2'));
  console.log(numbers);

  // switch (data) {
  //   case '+':
  //     console.log('un plus !');
  //     a + b;
  //     break;
  //   case '-':

  //     break;
  // }
};

dataArray = [];
const displayData = (data) => {
  dataArray.push(data);
  result.textContent = dataArray.join('');
};

buttons.forEach(button => button.addEventListener('click', handleData));
