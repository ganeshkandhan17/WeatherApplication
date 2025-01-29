let url = "https://api.openweathermap.org/data/2.5/weather";
let url1 = "https://api.openweathermap.org/data/2.5/forecast";
function getWeather(query) {
  return fetch(`${url}?q=${query}&units=metric&appid=${process.env.apikey}`);
}

function getForecast(query) {
  return fetch(`${url}?q=${query}&units=metric&appid=${process.env.apikey}`);
}

module.exports = { getWeather, getForecast };
