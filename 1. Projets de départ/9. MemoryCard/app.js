const cards = document.querySelectorAll('.card');

const shuffleCards = () => {
  cards.forEach(card => {
    const randomPos = Math.trunc(Math.random() * cards.length);
    card.style.order = randomPos;
  });
};
shuffleCards();

let lockedCards = false;
let cardsPicked = [];

const flipACard = (e) => {
  if (lockedCards) return;

  const card = e.target.children[0];
  const cardValue = e.target.getAttribute('data-attr');
  saveCard(card, cardValue);

  if (cardsPicked.length  === 2) result();
};

cards.forEach(card => card.addEventListener('click', flipACard));

const saveCard = (el, value) => {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add('active');
  cardsPicked.push({el, value});
  console.log(cardsPicked);
};


const result = () => {
  saveNumberOfTries();

  if (cardsPicked[0].value === cardsPicked[1].value) {
    cardsPicked[0].el.parentElement.removeEventListener('click', flipACard);
    cardsPicked[1].el.parentElement.removeEventListener('click', flipACard);
    cardsPicked = [];
    return;
  }
  lockedCards = true;
  setTimeout(() => {
    cardsPicked[0].el.classList.remove('active');
    cardsPicked[1].el.classList.remove('active');
    cardsPicked = [];
    lockedCards = false;
  }, 1000)
};


const innerCards = [...document.querySelectorAll('.double-face')];
const advice = document.querySelector('.advice');
const score = document.querySelector('.score');

let numberOfTries = 0;
const saveNumberOfTries = () => {
  numberOfTries ++;
  const checkForEndGame = innerCards.filter(card => !card.classList.contains('active'));
  if (!checkForEndGame.length) {
    advice.textContent = 'Bravo ! Appuyez sur "espace" pour relancer une partie.'
    score.textContent = `Votre score final : ${numberOfTries}`;
    resetGame();
    return;
  }
  score.textContent = `Nombre de coups : ${numberOfTries}`;
};

let shuffleLock = false;
const resetGame = (e) => {
  e.preventDefault();
  if (e.key === ' ') {
    innerCards.forEach(card => card.classList.remove('active'));
    numberOfTries = 0;
    advice.textContent = 'Tentez de gagner avec le moins d\'essais possible.';
    score.textContent = `Nombre de coups : ${numberOfTries}`;
    cards.forEach(card => card.addEventListener('click', flipACard));

    if (shuffleLock) return;
    shuffleLock = true;

    setTimeout(() => {
      shuffleCards();
      shuffleLock = false;
    }, 600);
  }
};

window.addEventListener('keydown', resetGame);
