const express = require("express");
const connectToDB = require("./db");
const app = express();
const port = process.env.APP_PORT || 5000;
const cors = require('cors')

const AuthRoutes = require("./routes/auth");
const NotesRoutes = require("./routes/notes");

// Database Connection
connectToDB();

// App Configuration
app.use(express.json());
app.use(cors());

// App Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/notes", NotesRoutes);

// App Initialisation
app.listen(port, () => {
  console.log(`Connected To App On http://localhost:${port}`);
});
