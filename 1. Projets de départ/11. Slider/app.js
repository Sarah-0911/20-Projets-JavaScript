const slides = [...document.querySelectorAll('.slide')];
const directionBtns = [...document.querySelectorAll('.direction-btn')];

const sliderData = {
  direction: 0,
  slideOutIndex: 0,
  slideInIndex: 0
};

const handleClick = (e) => {
  getDirection(e.target);
  };

  const getDirection = (btn) => {
    sliderData.direction = btn.classList.contains('right') ? 1 : -1;

    sliderData.slideOutIndex = slides.findIndex(slide => {
      slide.classList.contains('active');
    })

    if (sliderData.slideOutIndex + sliderData.direction > slides.length - 1) {
      sliderData.slideInIndex = 0;
    } else if (sliderData.slideOutIndex + sliderData.direction < 0) {
      sliderData.slideInIndex = slides.length -1;
    } else {
      sliderData.slideInIndex = sliderData.slideOutIndex + sliderData.direction;
    }
  };

directionBtns.forEach(btn => btn.addEventListener('click', handleClick));
