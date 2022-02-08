function changeDate() {
  let timeNow = document.querySelector("#time-now");
  timeNow.innerHTML = `${day}, ${hour}:${minutes}`;
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

changeDate();

function showWeather(response) {
  console.log(response);
  let highTemperature = Math.round(response.data.main.temp_max);
  let highTemperatureValue = document.querySelector("#high-temp");
  highTemperatureValue.innerHTML = `${highTemperature}°C`;

  let lowTemperature = Math.round(response.data.main.temp_min);
  let lowTemperatureValue = document.querySelector("#low-temp");
  lowTemperatureValue.innerHTML = `${lowTemperature}°C`;

  let weatherDescription = response.data.weather[0].description;
  let weatherDescriptionValue = document.querySelector(".weather-description");
  weatherDescriptionValue.innerHTML = `${weatherDescription}`;

  let wind = Math.round(response.data.wind.speed);
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = `Wind: ${wind} kmph`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `Humidity: ${humidity}%`;

  // let location = document.querySelector("#location");
  // location.innerHTML = `${response.data.name}`;
  document.querySelector("#location").innerHTML = response.data.name;
}

function search(city) {
  let apiKey = "064c71138727cd858b6ec37d95b7b5d3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showWeather);
}

function changeLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  search(city);
}

let searchForm = document.querySelector("#location-form");
searchForm.addEventListener("submit", changeLocation);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "064c71138727cd858b6ec37d95b7b5d3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getPosition);

search("London");
