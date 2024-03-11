const express = require("express");
const app = express();
const db = require("./dataBase");
require("dotenv").config();

//import passport.js file

const passport = require("./auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 4000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to :  ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

// Protected route requiring authentication
app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

// Import the router files
const personRoutes = require("./routes/personRoute");
const menuItemRoutes = require("./routes/menuRoute");

// Use the routers

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
