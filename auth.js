const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const personModel = require("./Schema/personSchema");

// Passport middleware
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received credentials : ", username, password);

      // jb aapko bar bar unanthourize ka message mile to please add await here
      const user = await personModel.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordMatch = await user.comparePassword(password);

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
