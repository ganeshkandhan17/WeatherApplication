import React from "react";
import { useState } from "react";
import LoadingLogo from "./assets/Loading.svg";
function App() {
  let tempdate = new Date();
  tempdate = tempdate.toString().slice(0, 21);
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false);
  let [date, setDate] = useState(tempdate);
  let [city, SetCity] = useState("");
  let [img, setImg] = useState("11n");
  let [temp, setTemp] = useState("0");
  let [wind, setWind] = useState("0");
  let [humidity, setHumidity] = useState("0");
  let iconUrl = `https://openweathermap.org/img/wn/${img}@2x.png`;
  return (
    <>
      <div className={loading ? "loadingScreen active" : "loadingScreen"}>
        <img className="loadingIcon" src={LoadingLogo} alt="" />
        <br></br>
        <p>Please Wait</p>
      </div>
      <div className="container_1">
        <div className="container_1_1">
          <input
            className="input"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="City Name"
          />
          <button
            onClick={() => {
              setLoading(!loading);
            }}
            className="button"
          >
            <strong>Search</strong>
          </button>
        </div>
        <div className="container_1_2">
          <div className="container_1_2_1">
            <h2 className="city">Krishnagiri</h2>
            <p className="date">{date}</p>
            <img className="weatherIcon" src={iconUrl} />
            <p className="description">Sunny</p>
            <h1>{`${temp}°C`}</h1>
            <div className="container_1_2_1_1">
              <div className="Humidity">
                <p className="HumidityText">Humidity</p>
                <p className="HumidityValue">{`${humidity} %`}</p>
              </div>
              <div className="Wind">
                <p className="WindText">Humidity</p>
                <p className="HumidityValue">{`${wind} Km/h`}</p>
              </div>
            </div>
          </div>
          <div className="container_1_2_2">

          </div>
          <div className="container_1_2_3">

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
