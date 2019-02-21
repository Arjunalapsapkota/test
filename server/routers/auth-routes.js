const router = require("express").Router();
const passport = require("passport");

//list of strategies
const requireAuth = passport.authenticate("jwt", { session: false }); // Jwt strategy
const requireSignin = passport.authenticate("local", { session: false }); // Local Strategy
const googleauth = passport.authenticate("google", { scope: ["Email"] }); // google Strategy
const instaauth = passport.authenticate("instagram");
const passportSetup = require("../config/passport-setup");
const Authentication = require("../controllers/authentication");
const cors = require("cors");
// ######### Test Routes
router.post("/test", requireAuth, (req, res) => {
  console.log(
    "This is a Test Route for POST request and Test Route is  working"
  );
});

router.get("/test", (req, res) => {
  console.log(
    "This is a Test Route for GET request and Test Route is  working"
  );
  res.send("newLogin");
});
//######## Test Routes End

router.get("/google", googleauth); // Google auth
router.get("/instagram", instaauth);
//auth callback from google
router.get(
  "/google/redirect",

  passport.authenticate("google"), //what does this do?

  (req, res) => {
    res.redirect("http://localhost:3000/mySiftz");
    console.log(req);
  }
);

router.get(
  "/instagram/redirect",

  passport.authenticate("instagram"),
  Authentication.signin
);
router.post("/signup", Authentication.signup);

router.post("/signin", requireSignin, Authentication.signin);

router.get("/login", (req, res) => {
  res.render("newLogin", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("signUp");
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

module.exports = router;
