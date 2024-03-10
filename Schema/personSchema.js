const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number, // Age is optional
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: String, // Address is optional
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

// Create Person model
const PersonModel = mongoose.model("person", personSchema);
module.exports = PersonModel;
