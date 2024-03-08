const express = require("express");
const app = express();
const db = require("./dataBase");
require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 4000;

const personModel = require("./Schema/personSchema");

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to :  ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

// Passport middleware
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received credentials : ", username, password);
      const user = await personModel.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordMatch = user.password === password;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

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
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
