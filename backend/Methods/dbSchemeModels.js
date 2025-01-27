let mongoose = require("mongoose");
let history = {
  user_Id: String,
  city_name: String,
  timestamp: String,
};
let historySchema = new mongoose.Schema(history);
let historyModel = mongoose.model("Search_History", historySchema);
function addNewData(id, city, timestamp) {
  let newdata = new historyModel({
    user_Id: id,
    city_name: city,
    timestamp: timestamp,
  });
  newdata
    .save()
    .then((data) => {
      if (!data) {
        console.log("Data not saved");
        throw new Error("Data not saved");
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
}

function deleteAllData(id) {
  historyModel
    .deleteMany({ user_Id: id })
    .then((data) => {
      if (data.deletedCount === 0) {
        throw new Error("Data not deleted");
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
}

function getHistory(id) {
  historyModel
    .find({ user_Id: id })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
}

module.exports = { addNewData, deleteAllData, getHistory };
