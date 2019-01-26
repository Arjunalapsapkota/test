require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();

const cors = require("cors");
const mongodb = require("mongoose");
// Define middleware here
app.use(cors()); // Handles all the cors issue
app.use(bodyParser.json({ type: "*/*" })); // Type indicates ALL header types OK
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "..", "..", "public"))); // Serve files in our Rect app public directory

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Mongo Db connection
try {
  mongodb.connect(
    process.env.MONGO_DB_URL,
    () => {
      console.log("connected mongoDB");
    }
  );
} catch (error) {
  console.log(error);
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});
