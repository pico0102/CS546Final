//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const data = require("../data");
const gameData = data.games;

var app2 = express();
app2.use(bodyParser());

router.get("/:id", (req, res) => {
    gameData.getGameById(req.params.id).then((game) => {
        res.render('games/single', { game: game });
    }).catch(() => {
        res.status(404).json({error: "Game not found" });
    });   
});

module.exports = router;