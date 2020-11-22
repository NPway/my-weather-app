function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0` + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0` + minutes;
    }

    return `${hours}:${minutes}`;
}
function displayCurrentDate() {

    let now = new Date();
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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let date = now.getDate();
    let hour = ("0" + now.getHours()).substr(-2);
    let minute = ("0" + now.getMinutes()).substr(-2);
    document.getElementById("current-month").innerHTML = `${month}, ${date}`;
    document.getElementById("current-day").innerHTML = `${day}`;
    document.getElementById("current-time").innerHTML = `${hour}:${minute}`;

}

function showCurrentWeather(response) {

    celsiusTemperature = response.data.main.temp;
    let iconElement = document.querySelector("#current-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);


    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#value").innerHTML = response.data.main.humidity;
    document.querySelector("#main").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;

}

function displayForecast(response) {

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    for (let index = 0; index < 5; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `

     <div class="col-sm center-block text-center">
            <li class="time list-unstyled">${formatHours(forecast.dt * 1000)}</li>
<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" id="forecast-icon"/> 
             <li class="max list-unstyled">${Math.round(forecast.main.temp_max)}º</li>
         <p><span class="text-capitalize">${forecast.weather[0].description}</span> </p>
          </div>`;

    }

}
function searchCity(city) {
    let apiKey = "ce35f333b488751dbaa9bd05ed8a743f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentWeather);


    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

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

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

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

displayCurrentDate();



