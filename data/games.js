//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const mongoCollections = require("../config/mongoCollections");
const gameCollection = mongoCollections.games;
const uuidV4 = require('uuid/v4');

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
            return games.find({}).toArray();
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

    getGamesByKeyword(key)
    {
        if (!key)
            return Promise.reject("You must provide a keyword to search for");
        
        var query = new RegExp('/.*' + key + '.*/');

        return gameCollection().then((games) => {
            return games.find({ $or:[
                { name: key },
                { keywords: key }]
            }).toArray();
        });
    },

    addGame(gameData)
    {
        if (!gameData.name) 
            return Promise.reject("Games require a name");
        if (!gameData.description) 
            return Promise.reject("Games require a description");
        if (!gameData.art)
            return Promise.reject("Games require art")
        if (!gameData.keywords)
            return Promise.reject("Games require keywords");
        
        return gameCollection().then((games) => {
            let newGame = {     
                _id: uuidV4(),
                name: gameData.name,
                keywords: gameData.keywords,
                art: gameData.art,
                description: gameData.description
            };

            return games
                .insertOne(newGame)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getGameById(newId);
                });
        });
    }
}

module.exports = exportedMethods;
