const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const personModel = require("././Schema/personSchema");

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

module.exports = passport;
