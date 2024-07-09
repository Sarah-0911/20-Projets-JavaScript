const cells = document.querySelectorAll('.cell');

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


const drawItem = (e) => {
  console.log(e.target);

  for (let i = 0; i < currentGame.length; i++) {
    currentGame[i] = 'O';
    e.target.textContent = 'O';

    if (currentGame[i] = 'O') {
      currentGame[i] += 'X';
      e.target.textContent = 'X';

    } else if (currentGame[i] = 'X') {
      currentGame[i] += 'O';
      e.target.textContent = 'O';
    }
  }
  console.log(currentGame);

  // if (condition) {
  // } else {
  //   cell.textContent = 'O';
  // }
};

cells.forEach(cell => cell.addEventListener('click', drawItem));
