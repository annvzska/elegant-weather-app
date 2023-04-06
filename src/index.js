let now = new Date();

let timeHours = now.getHours();
if (timeHours < 10) {
  timeHours = `0${timeHours}`;
}
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
let currentMonth = months[now.getMonth()];
let currentDay = days[now.getDay()];
let timeMinutes = now.getMinutes();
if (timeMinutes < 10) {
  timeMinutes = `0${timeMinutes}`;
}

let currentWeekDay = document.querySelector("#today-weekday");
currentWeekDay.innerHTML = `${currentDay}`;
let day = document.querySelector("#number-day");
day.innerHTML = now.getDate();
let thisMonth = document.querySelector("#month");
thisMonth.innerHTML = `${currentMonth}`;
let currentTime = document.querySelector("#today-hours");
currentTime.innerHTML = `${timeHours}`;
let currentMinutes = document.querySelector("#today-minutes");
currentMinutes.innerHTML = `${timeMinutes}`;

function formatDay(timestamps) {
  let date = new Date(timestamps * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2" >
     <div id="forecast-weekdays">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="70px" height="70px"id="forecast-icon"/>
       <div id="forecast-temp">${Math.round(forecastDay.temp.max)}°</div>
       </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${description}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
  let currentCity = response.data.name;
  let currentCityElement = document.querySelector("#city");
  currentCityElement.innerHTML = `${currentCity}`;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
  celsiusTemperature = response.data.main.temp;
}

function showCity(city) {
  let apiKey = "2f8204846a8a048e67d989332add6ca7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchCurrentTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;
  let apiKey = "2f8204846a8a048e67d989332add6ca7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCurrentTemp);

//geolocation
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKeyGeo = "2326053c415cb1ddc6f3aebc7b91a2ad";
  let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyGeo}&units=metric`;
  axios.get(apiUrlGeo).then(showTemp);
}

function clickCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let greenButton = document.querySelector("#current-button");
greenButton.addEventListener("click", clickCurrent);

//celsius & fahrenheit
function celsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  linkFahrenheit.classList.remove("active");
  linkCelsius.classList.add("active");
}
let linkCelsius = document.querySelector("#celsius-link");
linkCelsius.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  linkCelsius.classList.remove("active");
  linkFahrenheit.classList.add("active");
}
let linkFahrenheit = document.querySelector("#fahrenheit-link");
linkFahrenheit.addEventListener("click", fahrenheit);

let celsiusTemperature = null;

showCity("Warsaw");