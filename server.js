const express = require("express");
const path = require("path");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 9000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});



app.get("/api/notes", function (req, res) {
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    console.log(notes);
    return res.json(notes);
});

app.get("/api/notes/:id", function (req, res) {
    let id = req.params.id;

    for (var i = 0; i < id.length; i++) {
        if (id === note[i].id) {
            return res.json(note[i]);
        }
    }
});
// filter array by note
app.delete("/api/notes/:id", function (req, res) {
    const { id } = req.params;
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    for(let i = 0; i<notes.length;i++){
        if(notes[i].id == id){
            notes.splice(i,1);
            break;
        }
    }
    
    // new filtered array write to db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);

})
//     makes new note
app.post("/api/notes", function (req, res) {
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    let newNote = req.body;
    newNote.id = notes.length + 1;
    console.log(newNote);
    notes.push(newNote);
    console.log(notes);
    // add notes fs wrte into db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    return res.json(newNote);

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});