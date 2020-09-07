let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function setCurrentDate() {


    let now = new Date();
    let day = days[now.getDay()];

    let date = now.getDate();
    let month = months[now.getMonth()];
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    document.querySelector("#current-day").innerHTML = `${day},`;
    document.querySelector("#current-month").innerHTML = `${month} ${date}`;
    document.querySelector("#current-time").innerHTML = `${hours}:${minutes}`;

}
setCurrentDate();


function showCurrentWeather(response) {

    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#value").innerHTML = response.data.main.humidity;
    document.querySelector("#main").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
}
function searchCity(city) {
    let apiKey = "ce35f333b488751dbaa9bd05ed8a743f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentWeather);
}


function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    searchCity(city);

}

function searchLocation(position) {
    let apiKey = "ce35f333b488751dbaa9bd05ed8a743f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentWeather);

}

function getCurrentLocation(event) {

    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);

}


function displayFahrenheitTemperature(event) {
    event.preventDefault();

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let temperatureElement = document.querySelector("#current-temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("London");