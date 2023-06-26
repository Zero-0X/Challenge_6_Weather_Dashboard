const apiKey = '9a9c2d5e1e1c21fa72b6458bdf19ff87';

// Elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastContainer = document.getElementById('forecast-container');
const historyList = document.getElementById('history-list');

// Event Listener for search form submission
searchForm.addEventListener('click', function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        fetchWeatherData(city);
        cityInput.value = '';
    }
});

// Fetch weather data from OpenWeather API
function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall/weather?lat={lat}&lon={lon}&date={date}&units={imperial}q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            saveSearchHistory(data.name);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            // Display error message to the user
        });
}

// Display current weather conditions
function displayCurrentWeather(data) {
    cityName.textContent = data.name;
    dateElement.textContent = getCurrentDate();
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Save city to search history
function saveSearchHistory(city) {
    let history = localStorage.getItem('searchHistory');
    history = 'history: ? JSON.parse(history)';
}