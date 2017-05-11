//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
const gameData = data.games;


router.get('/', function(req, res) {
    res.render('games/login', { user: req.user });
});

router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        //res.json(user);
        var finalArray = [];
        var gameArray = user.profile.games;
        for(var i = 0; i < gameArray.length; i++)
        {
            gameData.getGameById(gameArray[i]).then((game) => {
                finalArray.push(game);
            });
        }

        res.render('games/profile', { 
            user: user,
            games: finalArray
        });
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });
});

router.post("/", (req, res) => {
    let userInfo = req.body;

    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to create a user" });
        return;
    }

    if (!userInfo.password) {
        res.status(400).json({ error: "You must provide a password" });
        return;
    }

    if (!userInfo.name) {
        res.status(400).json({ error: "You must provide name" });
        return;
    }

    userData.addUser(userInfo)
        .then((newUser) => {
            res.json(newUser);
        }, () => {
            res.sendStatus(500);
        });
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
            }, (error) => {
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
            }, (error) => {
                console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });

});



module.exports = router;