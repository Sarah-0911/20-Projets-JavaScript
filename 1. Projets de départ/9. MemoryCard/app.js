const cards = document.querySelectorAll('.card');

const shuffleCards = () => {
  cards.forEach(card => {
    const randomPos = Math.trunc(Math.random() * cards.length);
    card.style.order = randomPos;
  });
};
shuffleCards();

let cardsPicked = [];

const flipACard = (e) => {
  const card = e.target.children[0];
  console.log(card);
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
  if (cardsPicked[0].value === cardsPicked[1].value) {
    cardsPicked[0].el.parentElement.removeEventListener('click', flipACard);
    cardsPicked[1].el.parentElement.removeEventListener('click', flipACard);
    cardsPicked = [];
    return;
  }

  setTimeout(() => {
    cardsPicked[0].el.classList.remove('active');
    cardsPicked[1].el.classList.remove('active');
    cardsPicked = [];
  }, 1000)
};


// handleScore();
