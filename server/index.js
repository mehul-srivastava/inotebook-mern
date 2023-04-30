const express = require("express");
const connectDB = require("./db");
const app = express();
const port = 3000;

// Database Connection
connectDB();

// App Routes
app.get("/", (req, res) => {
  res.send("App");
});

// App Setup
app.listen(port, () => {
  console.log(`App started on http://localhost:${port}`);
});
