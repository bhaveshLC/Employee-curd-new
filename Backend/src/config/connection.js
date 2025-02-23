const mongoose = require("mongoose");
require("dotenv").config();
async function connectToDB() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.error("Error connecting to Database", err);
    });
}
module.exports = connectToDB;
