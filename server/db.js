const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2"
    )
    .then(() => console.log("Connected To MongoDB Successfully!"))
    .catch((error) => console.log("MONGODB ERROR - ", error));
};

module.exports = connectDB;
