const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("../../config/keys");
const Author = require("../models/author.model");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt.secret,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      Author.findOne({ _id: payload.user._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};

// saves it into cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializes user id to get user info when user makes a page request
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
