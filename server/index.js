require("dotenv").config();
const express = require("express");

const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const mongodb = require("mongoose");
const router = require("express").Router();
const app = express();

const bodyParser = require("body-parser");

//const cookieSession = require("cookie-session");
const passport = require("passport");

const authRoutes = require("./routers/auth-routes");
const myShiftzRoutes = require("./routers/myShiftz-routes");
const passportSetup = require("./config/passport-setup");

// set view engine

// app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" })); // Type indicates ALL header types OK
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "..", "..", "public"))); // Serve files in our Rect app public directory

//cookie setUp

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIEKEY]
//   })
// );

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);
app.use("/myShiftz", myShiftzRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log("this is process.env here", process.env.MONGO_DB_URL);
//connect mongoDB
mongodb.connect(
  process.env.MONGO_DB_URL,
  () => {
    console.log("connected mongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

if (process.env.NODE_ENV === "test") app.use(morgan(() => null));
else
  app.use(
    morgan(
      "API Request (port " +
        this.port +
        "): :method :url :status :response-time ms - :res[content-length]"
    )
  );

app.listen(process.env.PORT || 3090, () => {
  console.log("app now listening for requests on port 3090");
});

process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});
