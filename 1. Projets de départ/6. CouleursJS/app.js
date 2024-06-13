const colorLabels = [...document.querySelectorAll('.input-group label')];
const colorPickerInput = [...document.querySelectorAll('input[type="color"]')];
const rangeLabelValue = document.querySelector('.orientation-value');

const gradientData = {
  angle: 90,
  colors: ['#FF5F6D', '#FFC371']
};

const populateUI = () => {
  colorLabels[0].textContent = gradientData.colors[0];
  colorLabels[1].textContent = gradientData.colors[1];

  colorPickerInput[0].value = gradientData.colors[0];
  colorPickerInput[1].value = gradientData.colors[1];

  colorLabels[0].style.backgroundColor = gradientData.colors[0];
  colorLabels[1].style.backgroundColor = gradientData.colors[1];

  document.body.style.background = `linear-gradient(${gradientData.angle}deg,
  ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

  rangeLabelValue.textContent = `${gradientData.angle}°`;

  adaptInputsColor()
};

const adaptInputsColor = () => {
  colorLabels.forEach(label => {
    const hexColor = label.textContent.replace("#", "");
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 144) / 1000;

    if (yiq >= 128) {
      label.style.color = '#111';
    } else {
      label.style.color = '#F1F1F1';
    }
  })
};

const rangeInput = document.querySelector('.inp-range');


const handleInclination = () => {
  gradientData.angle = rangeInput.value;
  rangeLabelValue.textContent = `${gradientData.angle}°`;
  populateUI();
};

rangeInput.addEventListener('input', handleInclination);


const changeColorInput = e => {
  const currentIndex = colorPickerInput.indexOf(e.target);
  gradientData.colors[currentIndex] = e.target.value.toUpperCase();
  populateUI()
};

colorPickerInput.forEach(input => input.addEventListener('input', changeColorInput));

populateUI()
