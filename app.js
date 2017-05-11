const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + '/public');

const users = require("./data/users");
const games = require("./data/games");

const configRoutes = require("./routes");
const exphbs  = require('express-handlebars');

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

let addUser = users.addUser({
    username: "Rad Username",
    password: "meme"
});

addUser.then((user) => {
    games.addGame({
        name: "Zelda",
        keywords: ["dank", "meme"],
        art: "https://upload.wikimedia.org/wikipedia/en/0/0e/BreathoftheWildFinalCover.jpg",
        description: "I nutted"
    }).then((game) => {
        console.log(user);
        console.log(game);
        users.addGameToUser(user._id, game._id).then((user) => {
            console.log(user);
        });
    });
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});