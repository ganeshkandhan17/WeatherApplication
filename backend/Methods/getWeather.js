let getGeo = require("./getGeo");
let url = "https://api.openweathermap.org/data/2.5/forecast";
function getWeather(query) {
  let lat, lon;
   return getGeo(query)
    .then((data) => data.json())
    .then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;
    })
    .then(() => {
      return fetch(`${url}?lat=${lat}&lon=${lon}&appid=${process.env.apikey}`)
    });
}
module.exports = getWeather;
