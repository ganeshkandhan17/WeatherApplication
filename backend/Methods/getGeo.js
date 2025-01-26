let url = "http://api.openweathermap.org/geo/1.0/direct";
async function getGeo(query) {
  return await fetch(`${url}?q=${query}&appid=${process.env.apikey}`);
}

module.exports = getGeo;
