const customCursor = document.querySelector('.custom-cursor');

const handleCustomCursor = (e) => {
  customCursor.style.transform = `
  translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
};

window.addEventListener('mousemove', handleCustomCursor);


const title = document.querySelector('.hero-content h1');
const subtitle = document.querySelector('.hero-content .subtitle');
const heroPushLink = document.querySelector('.hero-push-link');

const txt = 'Porsche, set free.';

const typewriter = (text, index) => {

  if (index > 3) subtitle.classList.add('active');
  if (index > 6) heroPushLink.classList.add('active');

  if (index < text.length) {
    setTimeout(() => {
      title.innerHTML += `<span>${text[index]}</span>`;
      typewriter(text, index + 1);
    }, 200);
  }
};

setTimeout(() => {
  typewriter(txt, 0);
}, 300);
