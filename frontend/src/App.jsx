import React from "react";
import { useState, useEffect } from "react";
import LoadingLogo from "./assets/Loading.svg";
import cityNotFoundIcon from "./assets/cityNotFound.svg";
import Cookies from "js-cookie";

function App() {
  let tempdate = new Date();
  tempdate = tempdate.toString().slice(0, 21);
  let [history, setHistory] = useState([]);
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false);
  let [date, setDate] = useState(tempdate);
  let [city, setCity] = useState("");
  let [img, setImg] = useState("11n");
  let [temperature, setTemperature] = useState("0");
  let [description, setDescription] = useState("");
  let [wind, setWind] = useState("0");
  let [humidity, setHumidity] = useState("0");
  let [notfound, setNotFound] = useState(false);
  let iconUrl = `https://openweathermap.org/img/wn/${img}@2x.png`;
  function isUserIdExist() {
    if (Cookies.get("userId")) {
      return true;
    }
    return false;
  }

  function getUserId() {
    fetch("http://127.0.0.1:3000/getid")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        Cookies.set("userId", data.id, { expires: 365 });
      });
  }
  function getWeather(search) {
    return fetch("http://localhost:3000/getweather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search }),
    });
  }
  function addhistory(id, city) {
    fetch("http://localhost:3000/addhistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id, city: city }),
    });
  }
  useEffect(() => {
    getWeather(search)
      .then((data) => data.json())
      .then((data) => {
        if (data.cod === "404") {
          setLoading(false);
          setNotFound(true);
        } else {
          setCity(data.name);
          setTemperature(data.main.temp);
          setHumidity(data.main.humidity);
          setWind(data.wind.speed);
          setImg(data.weather[0].icon);
          setDescription(data.weather[0].description);
          if (loading) {
            addhistory(Cookies.get("userId"), data.name);
          }
          setLoading(false);
        }
      });
  }, [loading]);

  useEffect(() => {
    if (!isUserIdExist()) {
      getUserId();
    }
    fetch("http://127.0.0.1:3000/gethistory", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: Cookies.get("userId") }),
    })
      .then((data) => data.json())
      .then((data) => {
        setHistory(data);
      });
  }, []);

  return (
    <>
      <div className={notfound ? "citynotfound active" : "citynotfound"}>
        <img
          className="citynotfoundicon"
          src={cityNotFoundIcon}
          alt="cityNotFoundIcon"
        />
        <h3>City Not Found</h3>
        <br></br>
        <button
          onClick={() => {
            setNotFound(false);
            setSearch("");
          }}
        >
          <strong>Close</strong>
        </button>
      </div>
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
            value={search}
            onChange={(e) => {
              console.log(e.target.value);
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
            <h2 className="city">{city}</h2>
            <p className="date">{date}</p>
            <img className="weatherIcon" src={iconUrl} />
            <p className="description">{description}</p>
            <h1>{`${temperature}°C`}</h1>
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
          <div className="container_1_2_2"></div>
          <div className="container_1_2_3">
            <h2>History</h2>
            <div className="container_1_2_3_1">
              <table className="HistoryTable">
                <thead>
                  <tr>
                    <th>Search</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>{
                  history.map((item)=>(
                    <tr>
                      <td>{item.city_name}</td>
                      <td>{item.timestamp}</td>
                    </tr>
                  ))}</tbody>
              </table>
            </div>

            <button
              className="DeleteAllButton"
              onClick={() => {
                fetch("http://127.0.0.1:3000/deletehistory", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userId: Cookies.get("userId") }),
                });
              }}
            >
              <strong>Delete All</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
