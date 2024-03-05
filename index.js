const express = require("express");

const app = express();

// port
const port = 4000;

// data covert into objec

app.use(express.json());

// import dataBase.js
const dataBase = require("./dataBase");

app.get("/", (req, res) => {
  res.send("good morning sir welcom to my hotel");
});

// import menuRoute.js
const menuRoute = require("./routes/menuRoute");
app.use("/menu", menuRoute);

// import menuRoute.js
const personRoute = require("./routes/personRoute");
app.use("/person", personRoute);
// running server
app.listen(port, () => console.log(` server is running on ${port}`));
