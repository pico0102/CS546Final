//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
const gameData = data.games;

router.get('/', function(req, res) {
    if(req.user == null)
        res.redirect('/');
    else
        res.render('/users/' + req.user._id, { user: req.user });
});

router.put("/:id", (req, res) => {
    let userInfo = req.body;

    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to update a user" });
        return;
    }

    let getUser = userData.getUserById(req.params.id).then(() => {
        return userData.updateUser(req.params.id, userInfo)
            .then((updatedUser) => {
                res.json(updatedUser);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });

});

router.put("/games/:userId", (req, res) => {
    let gameId = req.body;

    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to update a user" });
        return;
    }

    let getUser = userData.getUserById(req.params.id).then(() => {
        return userData.addGameToUser(req.params.id, gameId)
            .then((updatedUser) => {
                res.json(updatedUser);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });

});



module.exports = router;