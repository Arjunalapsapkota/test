require("dotenv").config();
const jwt = require("jwt-simple");
const User = require("../models/user-model");

//token generator , We are saving _id,userName,and time stamp on token
//and Token is ecoded with app_secret, which is only available on server
//this app_secret key will later be used for decoding the information
function tokenForUser(user) {
  console.log("Generating Token for user :", user.id);
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.APP_SECRET);
}

exports.signin = (req, res) => {
  console.log("i am triggered,", req.user);
  const tkn = tokenForUser(req.user);
  console.log("Sending token for user:", req.user.email);
  res.json({
    token: tkn
  });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log("received-data from the Form:", req.body);

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) return next(err);

    //If yes, return error
    if (existingUser) {
      console.log("This is existing user, go to login");
      return res.status(422).send({ error: "Username already exists!" });
    }

    const user = new User({
      email,
      password
      // add the rest of the info from the form and save it to its proper place in the schema
    });

    console.log("Saving Data to the Database");

    user.save(function(err) {
      if (err) return next(err);
      //If no, respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
