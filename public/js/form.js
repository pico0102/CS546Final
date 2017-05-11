//William Mosca
//CS 546 Lab 8
//I pledge my honor that I have abided by the Steves Honor System.

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
    var varName = document.getElementById(/*HTML ID*/);

    //******************************************* 
    // if the varName has contents in its element,
    // do this stuff. Includes changing elements,
    // events when something happens
    //******************************************* 
    if (varName) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        var palindromeElement = document.getElementById("palStr");

        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        var theList = document.getElementById("palList");

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                var palindromeValue = palindromeElement.value;

                var result = PalindromeMethods.checkPalindrome(PalindromeMethods.simplify(palindromeValue));
                //resultTextElement.textContent = "The result is " + result + " with string " + PalindromeMethods.simplify(palindromeValue);

                if(palindromeValue == "")
                {
                    resultTextElement.textContent = "Please enter a non-empty string";
                }
                else if(result){
                    var newElement = palindromeValue;
                    var entry = document.createElement('li');
                    entry.setAttribute("class", "is-palindrome");
                    entry.appendChild(document.createTextNode(newElement));
                    theList.appendChild(entry);
                    resultTextElement.textContent = "";
                }
                else{
                    var newElement = palindromeValue;
                    var entry = document.createElement('li');
                    entry.setAttribute("class", "not-palindrome");
                    entry.appendChild(document.createTextNode(newElement));
                    theList.appendChild(entry);
                    resultTextElement.textContent = "";
                }

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