const express = require("express");
const connectToDB = require("./db");
const app = express();
const port = 3000;

const AuthRoutes = require("./routes/auth");
const NotesRoutes = require("./routes/notes");

// Database Connection
connectToDB();

// App Configuration
app.use(express.json());

// App Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/notes", NotesRoutes);

// App Initialisation
app.listen(port, () => {
  console.log(`Connected To App On http://localhost:${port}`);
});
