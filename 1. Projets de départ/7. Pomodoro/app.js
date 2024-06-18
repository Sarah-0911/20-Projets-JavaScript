let workTime = 3;
let restTime = 3;

let currentInterval = false;
let timerId;

const formatedTime = (time) =>  {
  return `${Math.trunc(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
};

const displayWork = document.querySelector('.work-time');
const displayRest = document.querySelector('.rest-time');

displayWork.textContent = formatedTime(workTime);
displayRest.textContent = formatedTime(restTime);

const togglePlayBtn = document.querySelector('.toggle-btn');

const togglePomodoro = () => {
  handlePlayPause()

  if (currentInterval) return;

  currentInterval = true;
  workTime--;
  displayWork.textContent = formatedTime(workTime);
  timerId = setInterval(handleTicks, 1000);
};

let pause = true;
const handlePlayPause = () => {
  if (togglePlayBtn.getAttribute('data-toggle') === 'play') {
    pause = false;
    togglePlayBtn.firstElementChild.src = "ressources/pause.svg";
    togglePlayBtn.setAttribute('data-toggle', 'pause');
  } else {
    pause = true;
    togglePlayBtn.firstElementChild.src = "ressources/play.svg";
    togglePlayBtn.setAttribute('data-toggle', 'play');
  }
};

const cycles = document.querySelector('.cycles');
let cyclesNumber = 0;

const handleTicks = () => {
  if (!pause && workTime > 0) {
    workTime--;
    displayWork.textContent = formatedTime(workTime);
  }
  else if (!pause && !workTime && restTime > 0) {
    restTime--;
    displayRest.textContent = formatedTime(restTime);
  }
  else if (!pause && !workTime && !restTime) {
    workTime = 2;
    restTime = 3;
    displayWork.textContent = formatedTime(workTime);
    displayRest.textContent = formatedTime(restTime);
    cyclesNumber++
    cycles.textContent = `Cycle(s): ${cyclesNumber}`;
  }
};

togglePlayBtn.addEventListener('click', togglePomodoro);
