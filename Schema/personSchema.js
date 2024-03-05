const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number, // Assuming age should be a number
    required: true,
  },
  work: {
    type: String,
    enum: ["waiter", "chef", "manager"],
    required: true,
  },
  mobile_num: {
    type: String, // Use String if you're including country codes or special characters
    required: true,
    unique: true, // Corrected typo
  },
  email: {
    type: String,
    required: true,
    unique: true, // Corrected typo
  },
  address: {
    type: String,
    required: true,
  },
});

const personModel = mongoose.model("Person", personSchema);

module.exports = personModel;
