//Challenge 1
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

//Homework 5
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
  let currentCityElement = document.querySelector(".this-city");
  currentCityElement.innerHTML = `${currentCity}`;
}

function searchCurrentTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form").value;
  let cityElement = document.querySelector(".this-city");
  cityElement.innerHTML = `${city}`;
  let apiKey = "2f8204846a8a048e67d989332add6ca7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCurrentTemp);

//Homework 5 Geolocation

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

function celsius(event) {
  event.preventDefault();
  let bigTemp = document.querySelector("#main-temp");
  bigTemp.innerHTML = "19";
}
let link = document.querySelector("#celsius-link");
link.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  let bigTempF = document.querySelector("#main-temp");
  bigTempF.innerHTML = "66";
}
let linkF = document.querySelector("#fahrenheit-link");
linkF.addEventListener("click", fahrenheit);