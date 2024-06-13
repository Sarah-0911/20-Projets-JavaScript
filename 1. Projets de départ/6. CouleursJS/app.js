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


};

populateUI()
