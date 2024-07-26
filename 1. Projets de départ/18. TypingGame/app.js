const APIEndpoint = "https://type.fit/api/quotes";

const sentence = document.querySelector('.sentence-to-write');
const textareaToTest = document.querySelector('.textarea-to-test');

let spansFromRandomQuote;
let timer = 60;
let score = 0;
let timerStarted = false;
let timerId;


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
    textareaToTest.value = '';

  } catch (error) {
    console.log(error);
  }
};

const timeDisplayed = document.querySelector('.time');
const scoreDisplayed = document.querySelector('.score');


const handleStart = (e) => {
  if (e.key === "Escape") {
    timer = 60;
    score = 0;
    timerStarted = false;

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

const handleTyping = (e) => {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  const gameEnded = checkSpans(e);

  if (gameEnded) {
    getNewSentence();
    score += spansFromRandomQuote.length;
    scoreDisplayed.textContent = `Score: ${score}`;
  }
};

const startTimer = () => {
  timer --;
  timeDisplayed.textContent = `Temps: ${timer}`;

  timerId = setInterval(handleTime, 1000);
}

const handleTime = () => {
  timer --;
  timeDisplayed.textContent = `Temps: ${timer}`;
  if(timer === 0) {
    clearInterval(timerId);
    timerStarted = false;

    timeDisplayed.classList.remove('active');
    textareaToTest.classList.remove('active');

    spansFromRandomQuote.forEach(span => {
      return span.classList.contains('correct') ? score++ : '';
    })
  }
}

const checkSpans = (e) => {
  const inputTextArray = e.target.value.split('');
  let completedSentence = true;
  let currentGoodLetters = 0;


  spansFromRandomQuote.forEach((span, index) => {
    if (inputTextArray[index] === undefined) {
      span.className = '';
      completedSentence = false;
    } else if (inputTextArray[index] === span.textContent) {
      span.classList.remove('wrong');
      span.classList.add('correct');
      currentGoodLetters++;
    } else {
      span.classList.add('wrong');
      span.classList.remove('correct');
      completedSentence = false;
    }

    scoreDisplayed.textContent = `Score: ${score + currentGoodLetters}`;
  })
  return completedSentence;
};

getNewSentence();
window.addEventListener('keydown', handleStart);
