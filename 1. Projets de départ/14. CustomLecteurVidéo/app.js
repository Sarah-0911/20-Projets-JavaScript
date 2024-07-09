const video = document.querySelector('video');
const playToggler = document.querySelector('.play-toggler');
const togglerImg = document.querySelector('.play-toggler img');

const timersDisplay = document.querySelectorAll('.time-display');

const progressBar = document.querySelector('.progress-bar');

const togglePlay = () => {
  if (video.paused) {
    video.play();
    togglerImg.src = 'ressources/pause.svg';
    togglerImg.alt = 'pause icon';
  } else {
    video.pause();
    togglerImg.src = 'ressources/play.svg';
    togglerImg.alt = 'play icon';
  }
};

let current;
let totalDuration;

const fillDurationVariables = () => {
  if(Number.isNaN(video.duration)) return;

  current = video.currentTime;
  totalDuration = video.duration;

  formatedTime(current, timersDisplay[0]);
  formatedTime(totalDuration, timersDisplay[1]);
};

const formatedTime = (time, element) => {
  const mins = Math.trunc(time / 60);
  let secs = Math.trunc(time % 60);

  if (secs < 10) {
    secs = `0${secs}`;
  };
  element.textContent = `${mins}:${secs}`;
};

// const handleProgress = () => {

// };

video.addEventListener('loadeddata', fillDurationVariables);
window.addEventListener('load', fillDurationVariables);

video.addEventListener('click', togglePlay);
playToggler.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', fillDurationVariables);
// progressBar.addEventListener('timeupdate', handleProgress);
