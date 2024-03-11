const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

personSchema.pre("save", async function (next) {
  const person = this;
  // Hash the password only if it has been modified (or is new);
  if (!person.isModified("password")) return next();

  try {
    //has password geeration
    const salt = await bcrypt.genSalt(10);
    //has password
    const hashPassword = await bcrypt.hash(person.password, salt);
    //override the plain password with the hash one
    person.password = hashPassword;

    // call next fun
    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// Create Person model
const PersonModel = mongoose.model("person", personSchema);
module.exports = PersonModel;
