let express = require("express");
let dotenv = require("dotenv");
let mongoose = require("mongoose");
let cors = require("cors");
let getWeather = require("./Methods/getWeather");
let databaseConnectivity = require("./Methods/dataBaseConnectivity");
let { getUniqueID } = require("./Methods/getID");
let {
  addNewData,
  deleteAllData,
  getHistory,
} = require("./Methods/dbSchemeModels");
let date = require("date-fns");
dotenv.config();
const app = express();
databaseConnectivity();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/test", (req, res) => {
  res.send("Server is running");
});

app.post("/getweather", (req, res) => {
  let search = req.body.search;
  getWeather(search)
    .then((data) => data.json())
    .then((data) => {
      res.send(data);
    });
});

app.post("/gethistory", (req, res) => {
  let userId = req.body.userId;
  getHistory(userId).then((data) => {
    res.send(data);
  });
});

app.get("/getid", (req, res) => {
  res.send({ id: getUniqueID() });
});

app.post("/addhistory", (req, res) => {
  let userId = req.body.userId;
  let city = req.body.city;
  let timestamp = date.format(new Date(), "dd-MM-yy HH:mm");
  addNewData(userId, city, timestamp);
});

app.post("/deletehistory", (req, res) => {
  let userId = req.body.userId;
  deleteAllData(userId);
});
app.on("unCaughtException", (err) => {
  console.log(`Error: ${err.message}`);
});
