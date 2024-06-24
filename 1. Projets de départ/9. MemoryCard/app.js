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

};
