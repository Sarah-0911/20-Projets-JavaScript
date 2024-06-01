const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector('.quiz-form');

const titleResult = document.querySelector('.results h2');
const markResult = document.querySelector('.mark');
const helpResult = document.querySelector('.help');
const radioInputs = form.querySelectorAll('input[type="radio"]');

const handleSubmit = (e) => {
  e.preventDefault();

  const results = [];

  const radioButtons = form.querySelectorAll('input[type="radio"]:checked');
  radioButtons.forEach((radioButton, index) => {
    if (radioButton.value === responses[index]) {
        results.push(true);
      } else {
        results.push(false);
      }
  });
  showResults(results);
  addColors(results)
};

const showResults = (results) => {
  const errorsNumber = results.filter(result => result === false).length;

  switch (errorsNumber) {
    case 0:
      titleResult.textContent = `✔️ Bravo, c'est un sans faute ! ✔️`;
      helpResult.textContent = "Quelle culture ...";
      helpResult.style.display = "block";
      markResult.innerHTML = "Score : <span>5 / 5</span>";
      markResult.style.display = "block";
      break;
    case 1:
      titleResult.textContent = `✨ Vous y êtes presque ! ✨`;
      helpResult.textContent =
        "Retentez une autre réponse dans la case rouge, puis re-validez !";
      helpResult.style.display = "block";
      markResult.innerHTML = "Score : <span>4 / 5</span>";
      markResult.style.display = "block";
      break;
    case 2:
      titleResult.textContent = `✨ Encore un effort ... 👀`;
      helpResult.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      helpResult.style.display = "block";
      markResult.innerHTML = "Score : <span>3 / 5</span>";
      markResult.style.display = "block";
      break;
    case 3:
      titleResult.textContent = `👀 Il reste quelques erreurs. 😭`;
      helpResult.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      helpResult.style.display = "block";
      markResult.innerHTML = "Score : <span>2 / 5</span>";
      markResult.style.display = "block";
      break;
    case 4:
      titleResult.textContent = `😭 Peut mieux faire ! 😭`;
      helpResult.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      helpResult.style.display = "block";
      markResult.innerHTML = "Score : <span>1 / 5</span>";
      markResult.style.display = "block";
      break;
    case 5:
      titleResult.textContent = `👎 Peut mieux faire ! 👎`;
      helpResult.style.display = "block";
      helpResult.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      markResult.style.display = "block";
      markResult.innerHTML = "Score : <span>0 / 5</span>";
      break;

    default:
      titleResult.textContent = "Wops, cas innatendu.";
  }
};

const questions = document.querySelectorAll('.question-block');

const addColors = (results) => {
  results.forEach((response, index) => {
    if (results[index]) {
      questions[index].style.backgroundImage =
      'linear-gradient(to right, #a8FF78, #78ffd6)';
    } else {
      questions[index].style.backgroundImage =
      'linear-gradient(to right, #f5567b, #fd674c)';
    };
  })
};

const resetColor = (e) => {
  const index = e.target.name.slice(1) - 1;
  const parentQuestionBlock = questions[index];
  parentQuestionBlock.style.backgroundColor = '#f1f1f1';
  parentQuestionBlock.style.backgroundImage = 'none';
}

radioInputs.forEach(radioInput => radioInput.addEventListener('input', resetColor));
form.addEventListener('submit', handleSubmit);
