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

//-- Push down Button --

const slideDown = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: document.querySelector('#discover').offsetTop,
    behavior: "smooth"
  })
};

heroPushLink.addEventListener('click', slideDown);


//-- Intersection Observer --

// const sideApparitionContainers =  document.querySelectorAll('.side-apparition-container');

// const handleIntersect = (entries, observer) => {
//   console.log(entries);

//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('active');
//     }
//   })
// };

// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.1
// }
// const observer = new IntersectionObserver(handleIntersect, observerOptions);

// sideApparitionContainers.forEach(sideApparition => {
//   observer.observe(sideApparition);
// })

// window.addEventListener('DOMContentLoaded', handleIntersect);
