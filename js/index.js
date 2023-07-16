const apiKey = '9a9c2d5e1e1c21fa72b6458bdf19ff87';

// Elements
const searchButton = document.querySelector('#search-form button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastContainer = document.getElementById('forecast-container');
const historyList = document.getElementById('history-list');
let city;

// Event Listener for search form submission
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    city = cityInput.value.trim();

    if (city) {
        fetchWeatherData(city);
        cityInput.value = '';
    }
});

// Fetch weather data from OpenWeather API
function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city},global`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCurrentWeather(data.main, data.weather, data.wind);
            saveSearchHistory(data.name);


        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            // Display error message to the user
        });
}


// Display current weather conditions
function displayCurrentWeather(main, weather, wind) {
    cityName.textContent = `${main.name}`;
    dateElement.textContent = dayjs().format('MMMM D, YYYY');
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${weather[0].icon}.png`);
    temperature.textContent = `Temperature: ${main.temp}°F`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;
}

// display the 5-day forecast
function displayForecast () {
    forecastContainer.innerHTML = '';

    const forecastData = data.daily;
  
    forecastData.forEach(day => {
      const forecastDate = dayjs.unix(day.dt).format('MMMM D, YYYY');
      const forecastIcon = day.weather[0].icon;
      const forecastTemperature = `Temperature: ${day.temp.day}°F`;
      const forecastHumidity = `Humidity: ${day.humidity}%`;
      const forecastWindSpeed = `Wind Speed: ${day.wind_speed} m/s`;
  
      const forecastCard = document.createElement('div');
      forecastCard.classList.add('forecast-card');
  
      forecastCard.innerHTML = `
        <h3>${forecastDate}</h3>
        <img src="http://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather Icon">
        <p>${forecastTemperature}</p>
        <p>${forecastHumidity}</p>
        <p>${forecastWindSpeed}</p>
      `;
  
      forecastContainer.appendChild(forecastCard);
    });
  }

// Save city to search history
function saveSearchHistory(city) {
    let history = localStorage.getItem('searchHistory');
    let searchHistory = [];

    if (history) {
        searchHistory = JSON.parse(history);
    }

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    }

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}



