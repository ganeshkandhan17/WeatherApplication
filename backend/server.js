const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
let getWeather = require("./Methods/getWeather");
let databaseConnectivity = require("./Methods/dataBaseConnectivity");
let { getID, getUniqueID } = require("./Methods/getID");
let {
  addNewData,
  deleteAllData,
  getHistory,
} = require("./Methods/dbSchemeModels");
getHistory(1234);
// addNewData("1234", "Delhi", "2021-09-15");
dotenv.config();
const app = express();
databaseConnectivity();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
      console.log(data);
      res.send(data);
    });
});

app.on("unCaughtException", (err) => {
  console.log(`Error: ${err.message}`);
});
