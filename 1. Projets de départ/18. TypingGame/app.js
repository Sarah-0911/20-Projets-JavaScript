const APIEndpoint = "https://type.fit/api/quotes";

const sentence = document.querySelector('.sentence-to-write');
const textareaToTest = document.querySelector('.textarea-to-test');

let spansFromRandomQuote;
let timer;
let score;
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

    textareaToTest.value = '';
    locked = false;

  } catch (error) {
    sentence.textContent = error;
  }
};

const timeDisplayed = document.querySelector('.time');
const scoreDisplayed = document.querySelector('.score');


const handleStart = (e) => {

  if(!sentence.textContent) sentence.textContent = 'Attendez l\'arrivée de la phrase';

  if (e.key === "Escape") {
    if (timerId) {
      clearInterval(timerId);
      timerId = undefined;
    }

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

let locked = false;

const handleTyping = (e) => {
  if (!timerId) startTimer();

  if (locked) return;

  const gameEnded = checkSpans(e);

  if (gameEnded) {
    locked = true;
    getNewSentence();
    score += spansFromRandomQuote.length;
    scoreDisplayed.textContent = `Score: ${score}`;
  }
};

const startTimer = () => {
  timer --;
  timeDisplayed.textContent = `Temps: ${timer}`;

  timerId = setInterval(handleTime, 1000);
};

const handleTime = () => {
  timer --;
  timeDisplayed.textContent = `Temps: ${timer}`;

  if(timer === 0) {
    clearInterval(timerId);

    timeDisplayed.classList.remove('active');
    textareaToTest.classList.remove('active');

    spansFromRandomQuote.forEach(span => {
      return span.classList.contains('correct') ? score++ : '';
    })

    scoreDisplayed.textContent = `Score: ${score}`;
    textareaToTest.removeEventListener('input', handleTyping);
  }
};

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
