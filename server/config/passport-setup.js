require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model.js");

//Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    else
      user.comparePassword(password, function(err, isMatch) {
        if (err) return done(err);
        if (!isMatch) {
          console.log("NO MATCH # Please provide Valid Credentials");
          return done(null, false);
        } else {
          console.log("user found in the database,\nForwading the details");
          return done(null, user);
        }
      });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  //jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  console.log("JWT strategy, Token Received Successfully .. Token Retrieved!!");
  User.findOne({ _id: payload.sub }, function(err, user) {
    if (err) {
      console.log("Process failed, No match in the Database");
      return done(err, false);
    } else done(null, user);
  });
});

//Tell passport to use JWT Strategy
passport.use(jwtLogin);
passport.use(localLogin);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
//
passport.use(
  new GoogleStrategy(
    {
      //option for strategy

      //callbackURL: "/auth/google/redirect", //this is for local
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //callbackURL: "/auth/google/redirect" //this is for local

      callbackURL: "https://cinegrand.herokuapp.com/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      //   console.log("callback is fired");
      //   console.log("where is ID?", profile);
      //check if user is already in our database
      const email = profile.emails[0].value;
      User.findOne({ email: email }).then(userExsist => {
        if (userExsist) {
          console.log("user found", userExsist);
          done(null, userExsist);
        } else {
          new User({
            email: email,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
