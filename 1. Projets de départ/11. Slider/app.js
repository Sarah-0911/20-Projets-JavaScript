const slides = [...document.querySelectorAll('.slide')];
const directionBtns = [...document.querySelectorAll('.direction-btn')];

const sliderData = {
  locked: false,
  direction: 0,
  slideOutIndex: 0,
  slideInIndex: 0
};

const handleClick = (e) => {
  if (sliderData.locked) return;
  sliderData.locked = true;

  getDirection(e.target);

  slideOut();
  };

  const getDirection = (btn) => {
    sliderData.direction = btn.classList.contains('right') ? 1 : -1;

    sliderData.slideOutIndex = slides.findIndex(slide => slide.classList.contains('active'));

    if (sliderData.slideOutIndex + sliderData.direction > slides.length - 1) {
      sliderData.slideInIndex = 0;
    } else if (sliderData.slideOutIndex + sliderData.direction < 0) {
      sliderData.slideInIndex = slides.length -1;
    } else {
      sliderData.slideInIndex = sliderData.slideOutIndex + sliderData.direction;
    }
  };

  const slideIn = (e) => {
    slideAnimation({
      el: slides[sliderData.slideInIndex],
      props: {
        transition: 'transform .4s ease-out, opacity .6s ease-out',
        transform: `translateX(0%)`,
        opacity: 1
      }
    })
    slides[sliderData.slideInIndex].classList.add('active');
    slides[sliderData.slideOutIndex].classList.remove('active');

    e.target.removeEventListener('transitionend', slideIn);
    slides[sliderData.slideOutIndex].style.display = 'none';
    setTimeout(() => {
      sliderData.locked = false;
    }, 400);
  }

  const slideOut = () => {
    slideAnimation({
      el: slides[sliderData.slideInIndex],
      props: {
        display: 'flex',
        transform: `translateX(${sliderData.direction < 0 ? '100%' : '-100%'})`,
        opacity: 0
      }
    })

    slideAnimation({
      el: slides[sliderData.slideOutIndex],
      props: {
        transition: 'transform .4s cubic-bezier(0.74, -0.34, 1, 1.19), opacity .4s ease-out',
        transform: `translateX(${sliderData.direction < 0 ? '-100%' : '100%'})`,
        opacity: 1
      }
    })

    slides[sliderData.slideOutIndex].addEventListener('transitionend', slideIn);
  };

  const slideAnimation = (animationObject) => {
    for (const prop in animationObject.props) {
      animationObject.el.style[prop] = animationObject.props[prop];
    }
  };


directionBtns.forEach(btn => btn.addEventListener('click', handleClick));
