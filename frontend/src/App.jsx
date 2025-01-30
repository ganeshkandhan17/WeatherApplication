import React from "react";
import { useState, useEffect } from "react";
import LoadingLogo from "./assets/Loading.svg";
import cityNotFoundIcon from "./assets/cityNotFound.svg";
import Cookies from "js-cookie";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  let tempdate = new Date();
  tempdate = tempdate.toString().slice(0, 21);
  let [history, setHistory] = useState([]);
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false);
  let [date, setDate] = useState(tempdate);
  let [city, setCity] = useState("City");
  let [img, setImg] = useState("11n");
  let [temperature, setTemperature] = useState("0");
  let [fTemp, setFTemp] = useState("0");
  let [description, setDescription] = useState("Description");
  let [wind, setWind] = useState("0");
  let [humidity, setHumidity] = useState("0");
  let [notfound, setNotFound] = useState(false);
  let [tempForecast, setTempForecast] = useState([]);
  let [timeForecast, setTimeForecast] = useState([]);
  let [humidityForecast, setHumidityForecast] = useState([]);
  let [unit, setUnit] = useState(false);
  let iconUrl = `https://openweathermap.org/img/wn/${img}@2x.png`;

  function celcuisToFahrenheit(c) {
    let f = c * 1.8 + 32;
    setFTemp(f.toFixed(2));
  }

  function setGraph(search) {
    let temparr = [];
    let timearr = [];
    let humarr = [];
    getForecast(search)
      .then((data) => data.json())
      .then((data) => {
        data.list.map((chunk) => {
          humarr.push(chunk.main.humidity);
          temparr.push(chunk.main.temp);
          timearr.push(chunk.dt_txt.slice(11, 16));
        });
        setTempForecast(temparr);
        setTimeForecast(timearr);
        setHumidityForecast(humarr);
      });
  }

  function isUserIdExist() {
    if (Cookies.get("userId")) {
      return true;
    }
    return false;
  }

  function deletHistory() {
    fetch("http://127.0.0.1:3000/deletehistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: Cookies.get("userId") }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.result) {
          console.log("Delete Completed");
        } else {
          console.log("Delete Failed");
        }
      });
    setHistory([]);
  }
  function setWeather(search) {
    if (search) {
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
        })
        .catch((err) => {
          console.log(`Error in fetching weather ${err}`);
        });
    }
  }
  function reloadHistory() {
    fetch("http://127.0.0.1:3000/gethistory", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: Cookies.get("userId") }),
    })
      .then((data) => data.json())
      .then((data) => {
        setHistory(data);
      })
      .catch((err) => {
        console.log(`Error in fetching history from server`);
      });
  }

  function getUserId() {
    fetch("http://127.0.0.1:3000/getid")
      .then((data) => data.json())
      .then((data) => {
        Cookies.set("userId", data.id, { expires: 365 });
      });
  }
  function getWeather(search) {
    return fetch("http://127.0.0.1:3000/getweather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search }),
    });
  }
  function getForecast(search) {
    return fetch("http://127.0.0.1:3000/getforecast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search }),
    });
  }

  function addhistory(id, city) {
    fetch("http://127.0.0.1:3000/addhistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id, city: city }),
    });
  }
  useEffect(() => {
    // if (loading) {
      setWeather(search);
      reloadHistory();
      setGraph(search);
    
  }, [loading]);

  useEffect(() => {
    celcuisToFahrenheit(temperature);
  }, [temperature]);

  useEffect(() => {
    if (!isUserIdExist()) {
      getUserId();
    }
    reloadHistory();
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
            <button
              className={unit ? "toggleButton active" : "toggleButton"}
              onClick={() => {
                setUnit(!unit);
              }}
            >
              <strong>F</strong>
            </button>
            <h2 className="city">{city}</h2>
            <p className="date">{date}</p>
            <img className="weatherIcon" src={iconUrl} />
            <p className="description">{description}</p>
            <h1>{unit ? `${fTemp}°F` : `${temperature}°C`}</h1>
            <div className="container_1_2_1_1">
              <div className="Humidity">
                <p className="HumidityText">Humidity</p>
                <p className="HumidityValue">{`${humidity} %`}</p>
              </div>
              <div className="Wind">
                <p className="WindText">Wind</p>
                <p className="HumidityValue">{`${wind} Km/h`}</p>
              </div>
            </div>
          </div>
          <div className="container_1_2_2">
            <Line
              className="graph"
              options={{
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  title: {
                    display: true,
                    text: "Temperature and Humidity",
                  },
                },
              }}
              data={{
                labels: timeForecast.slice(0, 6),
                datasets: [
                  {
                    label: "Temperature °C",
                    data: tempForecast.slice(0, 6),
                    fill: false,
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: "rgba(75, 192, 192, 0.2)",
                  },
                  {
                    label: "Humidity %",
                    data: humidityForecast.slice(0, 6),
                    fill: false,
                    backgroundColor: "rgb(89, 192, 75)",
                    borderColor: "rgb(201, 255, 194)",
                  },
                ],
                tension: 0,
              }}
            />
          </div>
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
                <tbody>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <tr key={item._id}>
                        <td>{item.city_name}</td>
                        <td>{item.timestamp}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No History</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button className="DeleteAllButton" onClick={deletHistory}>
              <strong>Delete All</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
