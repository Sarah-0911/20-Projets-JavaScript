const musicsData = [
  { title: "Solar", artist: "Betical", id: 1 },
  { title: "Electric-Feel", artist: "TEEMID", id: 2 },
  { title: "Aurora", artist: "SLUMB", id: 3 },
  { title: "Lost-Colours", artist: "Fakear", id: 4 },
];

const audio = document.querySelector('audio');

const thumbnail = document.querySelector('.thumbnail');
const musicTitle = document.querySelector('.music-title');
const artistName = document.querySelector('.artist-name');
const indexTxt = document.querySelector('.current-index');


let currentMusicIndex = 1;

const populateUI = ({ title, artist }) => {

  thumbnail.src = `ressources/thumbs/${title}.png`;
  audio.src = `ressources/music/${title}.mp3`;
  musicTitle.textContent = title;
  artistName.textContent = artist;
  indexTxt.textContent = `${currentMusicIndex}/${musicsData.length}`;

  fillVariablesDuration();
};

//------------------------------------------------------------

const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');


let current;
let totalDuration;

const fillVariablesDuration = () => {
  if (Number.isNaN(audio.duration)) return;

  current = audio.currentTime;
  totalDuration = audio.duration;

  formatedTime(current, currentTime);
  formatedTime(totalDuration, durationTime);
};


const progressBar = document.querySelector('.progress-bar');
const progressBarContainer = document.querySelector('.progress-container');

const updateProgress = () => {
  current = audio.currentTime;
  formatedTime(current, currentTime);

  const progressPosition =  current / totalDuration;
  progressBar.style.transform = `scaleX(${progressPosition})`;
};


const rect = progressBarContainer.getBoundingClientRect();

const setProgress = (e) => {
  const progressClick = e.offsetX / rect.width;
  const newTime = progressClick * totalDuration;
  audio.currentTime = newTime;
};


const formatedTime = (time, element) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);

  element.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};


audio.addEventListener('loadeddata', fillVariablesDuration);
audio.addEventListener('timeupdate', updateProgress);
progressBarContainer.addEventListener('click', setProgress);

//-----------------------------------------------------------

const playButton = document.querySelector('.play-btn');

const handlePlayPause = () => {
  audio.paused ? play() : pause();
};

const play = () => {
  audio.play();
  playButton.firstElementChild.src = 'ressources/icons/pause-icon.svg';
};

const pause = () => {
  audio.pause();
  playButton.firstElementChild.src = 'ressources/icons/play-icon.svg';
};

playButton.addEventListener('click', handlePlayPause)

//-----------------------------------------------------------

populateUI(musicsData[currentMusicIndex - 1]);


// const prevButton = document.querySelector('.prev-btn');
// const nextButton = document.querySelector('.next-btn');

// const choosePreviousMusic = () => {
// };

// prevButton.addEventListener('click', choosePreviousMusic);
// nextButton.addEventListener('click', chooseNextMusic);
