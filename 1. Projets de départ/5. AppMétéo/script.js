const APIKey = 'ef0cfd25-8005-4203-962f-3777346a75c5';

const fetchData = async () => {
  const url = `http://api.airvisual.com/v2/nearest_city?key=${APIKey}`
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  displayData(data.data);
};

const cityName = document.querySelector('.city-name');
const countryName = document.querySelector('.country-name');
const temperature = document.querySelector('.temperature');

const displayData = (data) => {
  cityName.textContent = data.city;
  countryName.textContent = data.country;
  temperature.textContent = `${data.current.weather.tp}°`;
  // comment recup image icon correspondante avec le svg ?
};

document.addEventListener('DOMContentLoaded', fetchData);
