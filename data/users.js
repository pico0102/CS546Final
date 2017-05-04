//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const uuidV1 = require('uuid/v1');

let exportedMethods = {

    addUser(userData)
    {
        if(!userData.name)
            return Promise.reject("User Profiles require a name");
        if(!userData.password)
            return Promise.reject("Users require a password"); 
        
        var userId = uuidV1();

        return userCollection().then((users) => {
            let newUser = {     
                _id: userId,
                password: password,
                profile: {
                    _id: userId,
                    name: userData.name,
                    games: []
                }
            };

            return users
                .insertOne(newUser)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getUserById(newId);
                });
        });
    },

    getUserById(id)
    {
        if (!id) 
            return Promise.reject("You must provide an id to search for");

        return userCollection().then((users) => {
            return users.findOne({ _id: id });
        });
    },

    getUserProfileById(id)
    {
        return this.getUserById(id).then((user) => {
            if (!user) 
                return Promise.reject("User not found");

            return user.profile;
        });
    }
    
}

module.exports = exportedMethods;
