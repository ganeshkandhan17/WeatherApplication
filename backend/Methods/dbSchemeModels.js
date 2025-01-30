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
        console.log(`data saved ${id} ${city} ${timestamp}`);
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
      if (data.deletedCount == 0) {
        throw new Error("Data not deleted");
      } else {
        console.log("Data deleted " + id);
      }
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
}

function getHistory(id) {
  return historyModel.find({ user_Id: id }).sort({ _id: -1 });
}

module.exports = { addNewData, deleteAllData, getHistory };
