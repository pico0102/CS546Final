//William Mosca
//CS 546 Lab 8
//I pledge my honor that I have abided by the Steves Honor System.


const gameData = require("../../data/games")
const userData = require("../../data/users")


(function () {
    
    let MethodsToUse = {
        
    };

    var addgameForm = document.getElementById("addgame-form");

    if (addgameForm) {

        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            console.log("Hello!");

            try {
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");



            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
            }
        });
    }

})();