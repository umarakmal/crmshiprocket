const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Loads environment variables from .env file
require("dotenv").config();

const app = express();

//Connecting Database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/uploaddata");

// app middlewares

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);

//Establishing server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
