const form = document.querySelector('form');
const heightInput = document.querySelector('.height-input');
const weightInput = document.querySelector('.weight-input');
const bmiValue = document.querySelector('.bmi-value');
const result = document.querySelector('.result');

const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m
const handleForm = (e) => {
  e.preventDefault();
  calculateBMI();
};

const calculateBMI = () => {
  const height = parseInt(heightInput.value);
  const weight = parseInt(weightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    handleError();
    return;
  };

  const calculateBMI = (weight / Math.pow(height / 100, 2)).toFixed(1);
  showResult(calculateBMI);
};

const handleError = () => {
  bmiValue.textContent = 'Wops';
  bmiValue.style.color = 'inherit';
  result.textContent = 'Remplissez correctement les inputs.';
}

const showResult = (BMI) => {
  const rank = BMIData.find(data => {
    if (BMI >= data.range[0] && BMI <= data.range[1]) return data;
    else if (typeof data.range === 'number' && BMI >= data.range) return data;
  });
  
  bmiValue.textContent = BMI;
  bmiValue.style.color = `${rank.color}`;
  result.textContent = `Résultat : ${rank.name}`;
};

form.addEventListener('submit', handleForm);
