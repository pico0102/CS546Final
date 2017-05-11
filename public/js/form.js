//William Mosca
//CS 546 Lab 8
//I pledge my honor that I have abided by the Steves Honor System.

const gameData = require("../../data/games")
const userData = require("../../data/users")

(function () {
    

    //******************************************* 
    // Methods our script will use, reference
    // them later by doign MethodsToUse.METHODNAME
    //******************************************* 
    let MethodsToUse = {
        
    };

    //******************************************* 
    // Gets the whole section given an HTML ID
    //******************************************* 
    var loginForm = document.getElementById("login-form");

    //******************************************* 
    // if the varName has contents in its element,
    // do this stuff. Includes changing elements,
    // events when something happens
    //******************************************* 
    if (loginForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        var username = document.getElementById("user");
        var password = document.getElementById("pass");

        //TAKE CARE OF CHECKING THE BCRYPT HERE I GUESS?

        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                var userVal = username.value;
                var passVal = password.value;

                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden")

                resultTextElement.textContent = userVal + " " + passVal;

                resultContainer.classList.remove("hidden");
            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
    //******************************************* 
    //  END IF FOR varName CONTENTS
    //******************************************


})();