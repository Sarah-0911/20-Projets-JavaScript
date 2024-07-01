const directionBtns = document.querySelectorAll('.direction-btn');

const handleSlide = (e) => {
  const classList = e.target.classList;
  if (classList.contains('left')) {
    handleLeftSlide();
  } else if (classList.contains('right')) {
    handleRightSlide();
  }
};

const handleLeftSlide = () => {
  console.log('left!!!');
};

const handleRightSlide = () => {
  console.log('right!!!');
};

directionBtns.forEach(btn => btn.addEventListener('click', handleSlide));
