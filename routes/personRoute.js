const express = require("express");

const route = express.Router();

//import jwt.js

const { jwtAutMiddleWare, generateToken } = require("./../jwt");

// import personModel
const personModel = require("./../Schema/personSchema");

// post method in node js

route.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const menuData = new personModel(data);
    const saveData = await menuData.save();

    // create payload
    const payload = {
      id: saveData.id,
      username: saveData.username,
    };

    // if you want to print payload then

    console.log(JSON.stringify(payload));

    // token save and send

    const token = generateToken(payload);
    console.log("Token is : ", token);

    // send to the database
    res.status(200).json({ saveData: saveData, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//Login Route
route.post("/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // find the user by username
    const user = await personModel.findOne({ username: username });

    // if user does not exist or password does not match , return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    // generate Token

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

// get method

route.get("/", async (req, res) => {
  try {
    let data = await personModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// search by id or name of data

route.get("/:id", async (req, res) => {
  try {
    let Id = req.params.id;
    if (Id === "chef" || Id === "waiter" || Id === "manager") {
      let data = await personModel.find({ work: Id });
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: " worker name not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});
// put/patch method
route.put("/:id", async (req, res) => {
  try {
    let menuId = req.params.id;
    let menuBody = req.body;

    const data = await personModel.findByIdAndUpdate(menuId, menuBody, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ error: "menuId not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// delete method
route.delete("/:id", async (req, res) => {
  try {
    let menuId = req.params.id;

    const data = await personModel.findByIdAndDelete(menuId);
    if (!data) {
      return res.status(404).json({ error: "menuId not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = route;
