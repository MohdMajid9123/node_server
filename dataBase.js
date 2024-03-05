const mongoose = require("mongoose");

const mongooseUrl = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongooseUrl);

const db = mongoose.connection;

// connected server message
db.on("connected", () => console.log("server is connected"));

// disconnected server message
db.on("disconnected", () => console.log("server is disconnected"));

//error message
db.on("error", () => console.log("server is error"));

module.exports = db;
