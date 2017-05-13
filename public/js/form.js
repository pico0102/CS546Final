
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

    const favoriteButton = document.getElementById("favorite-button");

    if (favoriteButton) {
        favoriteButton.addEventListener("click", (ev) => {
            // get gameId from URL
            const gameId = location.pathname.split('/').slice(-1)[0];
            fetch('/profile/' + gameId, {method: 'PUT', credentials: 'same-origin'})
                .then(res => res.json())
                .then(res => {
                    if (res.error)
                        alert(res.error);
                    else
                        alert('Added!');
                });
        });
    }

})();