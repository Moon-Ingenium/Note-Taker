const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const PORT = 9000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});



app.get("/api/notes", function (req, res) {
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    console.log(notes);
    return res.json(notes);
});
//   app.get("/api/notes/:id", function(req, res) {
//     var chosen = req.params.character;




//     makes new note
app.post("/api/notes", function (req, res) {
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    // add notes fs wrte into db.json
    return res.json(newNote);

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});