const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  console.log(req.user);
  res.render("myShiftz", { userName: req.user.userName });
});

module.exports = router;
