const video = document.querySelector('video');
const playToggler = document.querySelector('.play-toggler');
const togglerIcon = document.querySelector('.play-toggler img');

const timersDisplay = document.querySelectorAll('.time-display');

const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');

const muteBtn = document.querySelector('.mute-btn');
const muteIcon = document.querySelector('.mute-btn img');

const volumeSlider = document.querySelector('.volume-slider');


const togglePlay = () => {
  if (video.paused) {
    video.play();
    togglerIcon.src = 'ressources/pause.svg';
  } else {
    video.pause();
    togglerIcon.src = 'ressources/play.svg';
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

  video.removeEventListener('loadeddata', fillDurationVariables);
  window.removeEventListener('load', fillDurationVariables);
};


const formatedTime = (time, element) => {
  const mins = Math.trunc(time / 60);
  let secs = Math.trunc(time % 60);

  if (secs < 10) {
    secs = `0${secs}`;
  };
  element.textContent = `${mins}:${secs}`;
};


const handleTimeUpdate = () => {
  current = video.currentTime;
  formatedTime(current, timersDisplay[0]);

  const progressPosition = current / totalDuration;
  progress.style.transform = `scaleX(${progressPosition})`;

  if (video.ended) {
    togglerIcon.src = 'ressources/play.svg';
  }
};

const handleProgressBarClick = (e) => {
 const rect = progressBar.getBoundingClientRect();
 const clickPosition = e.offsetX / rect.width;
 const newTime = clickPosition * video.duration;

 progress.style.transform = `scaleX(${clickPosition})`;
 video.currentTime = newTime;
};

const handleMute = () => {
  if(video.muted) {
    video.muted = false;
    muteIcon.src = "ressources/unmute.svg";
  } else {
    video.muted = true;
    muteIcon.src = "ressources/mute.svg";
  }
};

const handleVolume = () => {
  video.volume = volumeSlider.value / 100;
  if (video.volume === 0) {
    muteIcon.src = "ressources/mute.svg";
  } else {
    muteIcon.src = "ressources/unmute.svg";
  }
};

video.addEventListener('loadeddata', fillDurationVariables);
window.addEventListener('load', fillDurationVariables);

video.addEventListener('click', togglePlay);
playToggler.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', handleTimeUpdate);
progressBar.addEventListener('click', handleProgressBarClick);

muteBtn.addEventListener('click', handleMute);
volumeSlider.addEventListener('input', handleVolume);
