const loader = document.querySelector('.loader-container');
const errorInformation = document.querySelector('.error-information');

const APIKey = 'ef0cfd25-8005-4203-962f-3777346a75c5';

const getWeatherData = async () => {
  try {
    const url = `http://api.airvisual.com/v2/nearest_city?key=${APIKey}`
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    };

    const data = await response.json();

    const sortedData = {
      city: data.data.city,
      country: data.data.country,
      temperature: data.data.current.weather.tp,
      iconId: data.data.current.weather.ic
    };

      displayData(sortedData);
  } catch (error) {
      loader.classList.remove('active');
      errorInformation.textContent = error.message;
  }
};

// document.querySelector('.get-data').addEventListener('click', getWeatherData);

const cityName = document.querySelector('.city-name');
const countryName = document.querySelector('.country-name');
const temperature = document.querySelector('.temperature');
const infoIcon = document.querySelector('.info-icon');

const displayData = (data) => {
  loader.classList.remove('active');

  cityName.textContent = data.city;
  countryName.textContent = data.country;
  temperature.textContent = `${data.temperature}°`;
  infoIcon.src = `ressources/icons/${data.iconId}.svg`;
  infoIcon.style.width = '150px';
};

document.addEventListener('DOMContentLoaded', getWeatherData);
