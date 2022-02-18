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
  let highTemperature = Math.round(response.data.main.temp_max);
  let highTemperatureValue = document.querySelector("#high-temp");
  highTemperatureValue.innerHTML = `${highTemperature}°C`;

  let lowTemperature = Math.round(response.data.main.temp_min);
  let lowTemperatureValue = document.querySelector("#low-temp");
  lowTemperatureValue.innerHTML = `${lowTemperature}°C`;

  celsiusTemperatureHigh = Math.round(response.data.main.temp_max);
  celsiusTemperatureLow = Math.round(response.data.main.temp_min);

  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

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

function changeToFarenheit(event) {
  event.preventDefault;
  let highTemp = document.querySelector("#high-temp");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTempHigh = Math.round((celsiusTemperatureHigh * 9) / 5 + 32);
  highTemp.innerHTML = `${farenheitTempHigh}°F`;

  let lowTemp = document.querySelector("#low-temp");
  let farenheitTempLow = Math.round((celsiusTemperatureLow * 9) / 5 + 32);
  lowTemp.innerHTML = `${farenheitTempLow}°F`;
}

function changeToCelsius(event) {
  event.preventDefault;
  let highTemp = document.querySelector("#high-temp");
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  highTemp.innerHTML = `${celsiusTemperatureHigh}°C`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${celsiusTemperatureLow}°C`;
}

let celsiusTemperatureHigh = null;
let celsiusTemperatureLow = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", changeToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

search("London");
