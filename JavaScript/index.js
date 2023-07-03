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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city},US`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
             console.log(data);
            displayCurrentWeather(data.main, data.weather[0], data.wind);
            saveSearchHistory(data.name);

           
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            // Display error message to the user
        });
}
// const data = { format: function() {}};
// data.format(); 

// Display current weather conditions
function displayCurrentWeather(main, weather, wind) {
    cityName.textContent = main.name;
    dateElement.textContent = dayjs().format();
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${weather[0].icon}.png`);
    temperature.textContent = `Temperature: ${main.temp}°F`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;
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