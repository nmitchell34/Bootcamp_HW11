const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
// Data processing for POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// View/HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API/JSON Routes
var noteData = require("./db/db.json");

// app.get("/api/notes", function (req, res) {
//   res.json(noteData);
// });
app.get("/api/notes", function (req, res) {
  let allNotes = fs.readFileSync("./db/db.json");
  let jsonAllNotes = JSON.parse(allNotes);
  res.json(jsonAllNotes);
});

// app.post("/api/notes", function (req, res) {
//   noteData.push(req.body);
//   res.json(noteData);
// });

app.post("/api/notes", function (req, res) {
  req.body.id = noteData.length + 1;
  noteData.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
    console.log("Data Written");
  });
  res.json(noteData);
});

app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  let allNotes = fs.readFileSync("./db/db.json");
  let jsonAllNotes = JSON.parse(allNotes);

  for (i = 0; i < jsonAllNotes.length; i++) {
    console.log(jsonAllNotes[i].id);
    if (jsonAllNotes[i].id == req.params.id) {
      console.log("It matched the ID");
      jsonAllNotes.splice(i, 1);
      fs.writeFile("./db/db.json", JSON.stringify(jsonAllNotes), (err) => {
        if (err) throw err;
      });
    }
  }
  res.json(jsonAllNotes);
});

//Listening to PORT
app.listen(PORT, (req, res) => {
  console.log(`Currently Running on http://localhost:${PORT}`);
});

// One route at a time, push, deploy, troubleshoot.
//  git push heroku develop:master will push to heroku the develop code. Testing capabilities.
