const express = require("express");

const route = express.Router();

// import menuModel
const menuModel = require("./../Schema/menuSchema");

// post method in node js

route.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuData = new menuModel(data);
    const saveData = await menuData.save();

    res.status(200).json(saveData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// get method

route.get("/", async (req, res) => {
  try {
    let data = await menuModel.find();
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
    if (Id === "spicy" || Id === "sweet" || Id === "sour") {
      let data = await menuModel.find({ test: Id });
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "test not found" });
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

    const data = await menuModel.findByIdAndUpdate(menuId, menuBody, {
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

    const data = await menuModel.findByIdAndDelete(menuId);
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
