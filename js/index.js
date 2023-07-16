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
const localWeather = document.getElementById('local-weather');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');
const historyList = document.getElementById('history-list');
let city;


weatherContainer.classList.add('hidden');

// Call displaySearchHistory initially to populate the list
displaySearchHistory();

// Event Listener for search form submission
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    city = cityInput.value.trim();

    if (city) {
        fetchWeatherData(city);
        displayForecast();
        cityInput.value = '';

        saveSearchHistory(city);

        weatherContainer.classList.remove('hidden');
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

            displayForecast(city);
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
function displayForecast(city) {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city},global`;

    forecastContainer.innerHTML = '';

    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const forecastData = data.list;

            const dailyForecastData = forecastData.filter((day, index) => index % 8 === 0);


            dailyForecastData.forEach(day => {
                const forecastDate = dayjs.unix(day.dt).format('MMMM D, YYYY');
                const forecastIcon = day.weather[0].icon;
                const forecastTemperature = `Temperature: ${day.main.temp}°F`;
                const forecastHumidity = `Humidity: ${day.main.humidity}%`;
                const forecastWindSpeed = `Wind Speed: ${day.wind.speed} m/s`;

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
        })
        .catch(error => {
            console.log('Error fetching forecast data:', error);
            // Display error message to the user
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


    displaySearchHistory();
}

// Function to display the search history on the webpage
function displaySearchHistory() {
    let history = localStorage.getItem('searchHistory');
    let searchHistory = [];

    if (history) {
        searchHistory = JSON.parse(history);
    }

    historyList.innerHTML = '';

    searchHistory.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        historyList.appendChild(listItem);

        listItem.addEventListener('click', () => {
            fetchWeatherData(city);
        });
    });
}