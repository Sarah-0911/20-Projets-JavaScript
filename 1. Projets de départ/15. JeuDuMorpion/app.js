const cells = document.querySelectorAll('.cell');
const info = document.querySelector('.info');

const currentGame = ["","","","","","","","",""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';
info.textContent = `Au tour de ${currentPlayer}`;

let lock = false;

const handleClick = (e) => {
  const cellIndex = e.target.getAttribute('data-index');

  if (currentGame[cellIndex] !== '' || lock) return;

  currentGame[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  verification();
};

const verification = () => {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combinationToCheck = winningCombinations[i];

    const a = currentGame[combinationToCheck[0]];
    const b = currentGame[combinationToCheck[1]];
    const c = currentGame[combinationToCheck[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    } else if (a === b && b === c) {
      info.textContent = `Le joueur ${currentPlayer} a gagné !
      Appuyez sur F5 pour recommencer.`;
      lock = true;
      return;
    }
  }

  if (!currentGame.includes('')) {
    info.textContent = 'Match nul ! Appuyez sur F5 pour recommencer.';
    lock = true;
    return;
  }
  switchPlayer();
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  info.textContent = `Au tour de ${currentPlayer}`;
}


cells.forEach(cell => cell.addEventListener('click', handleClick));
