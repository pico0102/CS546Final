//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const gameRoutes = require("./games");
const userRoutes = require("./users");

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/games", gameRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;