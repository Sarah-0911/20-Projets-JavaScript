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


//-- Scroll Animation --

const generalAnimatedElements = [
  ...document.querySelectorAll('h2'),
  ...document.querySelectorAll('.section-subtitle')
];

const discoverSectionElements = [
  document.querySelector('.text-discover-content h3'),
  document.querySelector('.text-discover-content p'),
  document.querySelector('.discover-link'),
  document.querySelector('.discover-main-img')
];

const slideApparitionContainers = [
  ...document.querySelectorAll('.side-apparition-container')
];

const animatedContents = [
  ...generalAnimatedElements,
  ...discoverSectionElements,
  ...slideApparitionContainers
];

const handleIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  })
};

const observer = new IntersectionObserver(handleIntersect, {rootMargin: '-10%'});

animatedContents.forEach(animatedContent => {
  observer.observe(animatedContent);
});
