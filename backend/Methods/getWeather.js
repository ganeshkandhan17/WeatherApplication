let url = "https://api.openweathermap.org/data/2.5/weather";
function getWeather(query) {
  return fetch(`${url}?q=${query}&units=metric&appid=${process.env.apikey}`);
}
module.exports = getWeather;
