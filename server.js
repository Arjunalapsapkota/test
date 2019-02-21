require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();

const cors = require("cors");
const mongodb = require("mongoose");

const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoutes = require("./server/routers/auth-routes");
const myShiftzRoutes = require("./server/routers/myShiftz-routes");
const passportSetup = require("./server/config/passport-setup");

// Define middleware here
app.use(cors()); // Handles all the cors issue
app.options("*", cors());
app.use(bodyParser.json({ type: "*/*" })); // Type indicates ALL header types OK
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "..", "..", "public"))); // Serve files in our Rect app public directory

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET");
//     return res.status(200).json({});
//   }
// });
//app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Mongo Db connection
try {
  mongodb.connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true },
    () => {
      console.log("Successfully connected mongoDB (Cloud).. 8)");
    }
  );
} catch (error) {
  console.log(error);
}

// Define API routes here
//initialize passport
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);
app.use("/myShiftz", myShiftzRoutes);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get("/mySiftz", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});
