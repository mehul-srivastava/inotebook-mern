const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(
      "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2"
    )
    .then(() => console.log("Connected To MongoDB Successfully!"))
    .catch((error) => console.log(error));
};

module.exports = connectToDB;
