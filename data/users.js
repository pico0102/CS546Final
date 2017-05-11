//Gold Team: William Mosca, Max Remetz, Carla Noshi, Anthony Picone
//CS 546 Final Project
//I pledge my honor that I have abided by the Steves Honor System.

const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const uuidV4 = require('uuid/v4');

let exportedMethods = 
{
    getUserById(id)
    {
        if (!id) 
            return Promise.reject("You must provide an id to search for");

    addUser(userData)
    {
        if(!userData.username)
            return Promise.reject("User Profiles require a name");
        if(!userData.password)
            return Promise.reject("Users require a password"); 
        
        var userId = uuidV4();

        return userCollection().then((users) => {
            let newUser = {     
                _id: userId,
                password: userData.password,
                profile: {
                    _id: userId,
                    name: userData.username,
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

    updateUser(userId, userInfo)
    {
        if(!userId)
            return Promise.reject("You must provide an id to update");

        return userCollection().then((users) => {
            let updatedUserData = {};

            if(userInfo.password){
                updatedUserData.password = userInfo.password;
            }
            
            let updateInfo = {
                $set: updatedUserData
            };

            return users.updateOne({
                _id: userId
            }, updateInfo).then((result) =>
            {
                return this.getUserById(userId);
            });
        });
    },

    addGameToUser(userId, gameId)
    {
        return userCollection().then((users) => {
            return users.updateOne({_id: userId }, {
                $addToSet: {
                    'profile.games': gameId
                }
            }).then(() => {
                return this.getUserById(userId);
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
