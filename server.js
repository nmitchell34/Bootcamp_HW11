const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
// Data processing for POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View/HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

// API/JSON Routes
var noteData = require("./db/db.json")
//Listening to PORT
app.listen(PORT, (req, res) => {
  console.log(`Currently Running on http://localhost:${PORT}`);
});


// One route at a time, push, deploy, troubleshoot.
//  git push heroku develop:master will push to heroku the develop code. Testing capabilities.
