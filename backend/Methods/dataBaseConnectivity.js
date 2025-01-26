let mongoose = require("mongoose");
let dotenv = require("dotenv");
dotenv.config();
async function dataBaseConnectivity() {
  try {
    await mongoose.connect(process.env.mongodburl).then((data) => {
      console.log(`Database Connected ${data.connection.host}:${data.connection.port}`);
    });
  } catch (err) {
    console.log(`Database Connectivity Error: ${err.message}`);
  }
}

module.exports = dataBaseConnectivity;
