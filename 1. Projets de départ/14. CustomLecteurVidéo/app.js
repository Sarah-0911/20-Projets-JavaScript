const video = document.querySelector('video');
const playTogglerBtn = document.querySelector('.play-toggler');
const timer = document.querySelector('.timer');

const togglePlayer = () => {
  if (video.paused) {
    video.play();
    playTogglerBtn.firstElementChild.src = 'ressources/pause.svg';
    playTogglerBtn.firstElementChild.alt = 'pause icon';
  } else if (video.play()) {
    video.pause();
    playTogglerBtn.firstElementChild.src = 'ressources/play.svg';
  }
};

const displayTotalTime = () => {
  const totalTimer = timer.lastElementChild;
  totalTimer.textContent = `${Math.trunc(video.duration / 60)}: ${Math.trunc(video.duration % 60)}`;
};

const displayCurrentTime = () => {
  const currentTimer = timer.firstElementChild;
  const totalVideoTime = video.duration - e.target;
  console.log(totalVideoTime);
}

displayTotalTime();
displayCurrentTime();

playTogglerBtn.addEventListener('click', togglePlayer);
