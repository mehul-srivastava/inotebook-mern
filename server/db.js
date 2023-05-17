require("dotenv").config({ path: __dirname + "/.env.local" });
const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected To MongoDB Successfully!"))
    .catch((error) => console.log(error));
};

module.exports = connectToDB;
