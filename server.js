const express = require("express");
const PORT = process.env.PORT || 8090;
const path = require("path");

const app = express();

// how should express handle the POST data? Sets up the express app to handle data parsing.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// array of information or database
const characters = [
{
    routeName: 'yoda',
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
}, 
{
    routeName: 'darthmaul',
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
},
 {
    routeName: 'obi',
    name: "Obi Wan Kenobi",
    role: "Sith Lord",
    age: 700,
    forcePoints: 2200
}
];

// Beginning of API call to get info from above.

// app.get("/", (req, res) => {
//     res.send("Welcome to the Star Wars Page!");
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/characters/:character", (req, res) => {
    const character = req.params.character;

    console.log(character);

    let found;
      characters.forEach(char => {
        if(character === char.routeName) {
          found = char;
        }
      });
      res.json(found || { success: false });
    });

// Let's post our the info to the body of the page.
app.post("/api/characters/", (req, res) => {
    const newCharacter = req.body;

    newCharacter.routeName = req.body.name.split("").join("").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
});



// THIS SHOULD BE LAST. Code should be in between const app = express(); and the line below.
app.listen(PORT, () => {
    console.log(`Server is listening: ${PORT}`);
});

