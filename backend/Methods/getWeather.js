let weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
function getWeather(query) {
  return fetch(
    `${weatherUrl}?q=${query}&units=metric&appid=${process.env.apikey}`
  );
}

function getForecast(query) {
  return fetch(
    `${forecastUrl}?q=${query}&units=metric&appid=${process.env.apikey}`
  );
}

module.exports = { getWeather, getForecast };
