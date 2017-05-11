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

    var searchForm = document.getElementById("search-form");

    //******************************************* 
    // if the varName has contents in its element,
    // do this stuff. Includes changing elements,
    // events when something happens
    //******************************************* 

    if (searchForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        var searchStr = document.getElementById("searchStr");

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {

            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
            }
        });
    }
    //******************************************* 
    //  END IF FOR varName CONTENTS
    //******************************************


})();