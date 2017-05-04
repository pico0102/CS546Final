//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const mongoCollections = require("../config/mongoCollections");
const gameCollection = mongoCollections.games;
const uuidV1 = require('uuid/v1');

let exportedMethods = {
    

    getGameById(id)
    {
        if (!id) 
            return Promise.reject("You must provide an id to search for");

        return gameCollection().then((games) => {
            return games.findOne({ _id: id });
        });
    },

    getAllGames()
    {
        return gameCollection().then((games) => {
            return games.find();
        });
    },

    getGameByName(name) 
    {
        if (!name) 
            return Promise.reject("You must provide a Video Game to search for");

        var query = { name: new RegExp('^' + name) };

        return gameCollection().then((games) => {
            return games.find(query);
        });
    },
    
    getGamesByGenre(genre)
    {
        if (!genre)
            return Promise.reject("You must provide a genre to search for");
        
        return gameCollection().then((games) => {
            return games.find({ keywords: { $elemMatch: genre } });
        });
    },

}

module.exports = exportedMethods;
