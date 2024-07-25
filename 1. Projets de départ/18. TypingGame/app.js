const APIEndpoint = "https://type.fit/api/quotes";

const sentence = document.querySelector('.sentence-to-write');
const textareaToTest = document.querySelector('.textarea-to-test');

let spansFromRandomQuote;

const getNewSentence = async() => {

  try {
    const response = await fetch(APIEndpoint);

    if (!response.ok) throw new Error();

    const data = await response.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)].text;

    sentence.textContent = '';

    randomQuote.split('').forEach(char => {
      const spanChar = document.createElement('span');
      spanChar.textContent = char;
      sentence.appendChild(spanChar);
    });

    spansFromRandomQuote = document.querySelectorAll('.sentence-to-write span');
    // console.log(spansFromRandomQuote);

  } catch (error) {
    console.log(error);
  }

};

getNewSentence();

const timeDisplayed = document.querySelector('.time');
const scoreDisplayed = document.querySelector('.score');

let timer = 60;
let score = 0;

const handleStart = (e) => {

  if (e.key === "Escape") {
    timer = 60;
    score = 0;

    timeDisplayed.classList.add('active');
    textareaToTest.classList.add('active');

    timeDisplayed.textContent = `Temps: ${timer}`;
    scoreDisplayed.textContent = `Score: ${score}`;
    textareaToTest.value = '';

    spansFromRandomQuote.forEach(span => span.className = '');

    textareaToTest.addEventListener('input', handleTyping);
    textareaToTest.focus();
  }
};

// let timerStarted = false;
// let intervalId;

const handleTyping = (e) => {
  const checkedSpans = checkSpans();

  // if (timerStarted) return;

  // timerStarted = true;

  // intervalId = setInterval(() => {
  //   if (timer > 0 && e.key !== 'Escape') {
  //     timer --;
  //     timeDisplayed.textContent = `Temps: ${timer}`;
  //   } else {
  //     clearInterval(intervalId);
  //     timerStarted = false;
  //   }
  // }, 1000);
};

const checkSpans = () => {

};

// const matchText = (e) => {
//   const inputText = e.target.value.split('');
//   console.log(inputText);
//   spansFromRandomQuote.forEach((span, index) => {
//     if (inputText[index] === span.textContent) {
//       span.style.color = 'green';
//     } else {
//       span.style.color = 'red';
//     }
//   })
// };

// textareaToTest.addEventListener('input', matchText);


window.addEventListener('keydown', handleStart);
