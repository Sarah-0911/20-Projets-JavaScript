let workTime = 1800;
let restTime = 300;

const formatedTime = (time) =>  {
  return `${Math.trunc(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
};

const displayWork = document.querySelector('.work-time');
const displayRest = document.querySelector('.rest-time');

const displayTimes = () => {
  displayWork.textContent = formatedTime(workTime);
  displayRest.textContent = formatedTime(restTime);
}


const startButton = document.querySelector('.start-btn');

const handleTimer = () => {
  const time = setTimeout(() => {
    workTime--;
  }, 1000);
  displayTimes();
  console.log(time);
};

startButton.addEventListener('click', handleTimer);
