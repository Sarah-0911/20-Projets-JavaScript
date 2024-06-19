let workTime = 1800;
let restTime = 300;

const formatedTime = (time) =>  {
  return `${Math.trunc(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
};

const displayWork = document.querySelector('.work-time');
const displayRest = document.querySelector('.rest-time');

displayWork.textContent = formatedTime(workTime);
displayRest.textContent = formatedTime(restTime);

const togglePlayBtn = document.querySelector('.toggle-btn');

let currentInterval = false;
let timerId;

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

    if (workTime) {
      handleClassAnimation({work: true, rest: false})
    } else {
      handleClassAnimation({work: false, rest: true})
    }
  } else {
    pause = true;
    togglePlayBtn.firstElementChild.src = "ressources/play.svg";
    togglePlayBtn.setAttribute('data-toggle', 'play');
    handleClassAnimation({work: false, rest: false})
  }
};

const cycles = document.querySelector('.cycles');
let cyclesNumber = 0;

const handleTicks = () => {
  if (!pause && workTime > 0) {
    workTime--;
    displayWork.textContent = formatedTime(workTime);
    handleClassAnimation({work: true, rest: false});
  }
  else if (!pause && !workTime && restTime > 0) {
    restTime--;
    displayRest.textContent = formatedTime(restTime);
    handleClassAnimation({work: false, rest: true});
  }
  else if (!pause && !workTime && !restTime) {
    workTime = 1799;
    restTime = 300;
    displayWork.textContent = formatedTime(workTime);
    displayRest.textContent = formatedTime(restTime);
    handleClassAnimation({work: true, rest: false});

    cyclesNumber++
    cycles.textContent = `Cycle(s): ${cyclesNumber}`;
  }
};

togglePlayBtn.addEventListener('click', togglePomodoro);

const resetBtn = document.querySelector('.reset-btn');

const reset = () => {
  workTime = 3;
  restTime = 3;

  displayWork.textContent = formatedTime(workTime);
  displayRest.textContent = formatedTime(restTime);

  cyclesNumber = 0;
  cycles.textContent = `Cycle(s): ${cyclesNumber}`;

  clearInterval(timerId);
  currentInterval = false;
  pause = true;

  togglePlayBtn.setAttribute('data-toggle', 'play');
  togglePlayBtn.firstElementChild.src = "ressources/play.svg";

  handleClassAnimation({work: false, rest: false});
};

const handleClassAnimation = (itemsState) => {
  for (const item in itemsState) {
    if (itemsState[item]) {
      document.querySelector(`.${item}`).classList.add('active');
    } else {
      document.querySelector(`.${item}`).classList.remove('active');
    }
  }
};

resetBtn.addEventListener('click', reset);
