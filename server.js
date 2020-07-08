const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
// Data processing for POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public/assets'))
// View/HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API/JSON Routes
var noteData = require("./db/db.json");

app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let allNotes = JSON.parse(data);
    console.log(allNotes);
  });
});

app.post("/api/notes", function (req, res) {
  console.log(req);
  noteData.push(req.body);
});
//Listening to PORT
app.listen(PORT, (req, res) => {
  console.log(`Currently Running on http://localhost:${PORT}`);
});

// One route at a time, push, deploy, troubleshoot.
//  git push heroku develop:master will push to heroku the develop code. Testing capabilities.
