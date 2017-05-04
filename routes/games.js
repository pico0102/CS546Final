//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const express = require('express');
const router = express.Router();
const data = require("../data");
const gameData = data.games;


router.get("/:id", (req, res) => {
    gameData.getGameById(req.params.id).then((game) => {
        res.json(game);
    }).catch(() => {
        res.status(404).json({error: "Game not found" });
    });   
});


router.get("/", (req, res) => {
    gameData.getAllGames().then((games) => {
        res.json(games);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

module.exports = router;