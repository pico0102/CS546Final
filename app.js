const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
const static = express.static(__dirname + '/public');

const users = require("./data/users");
const games = require("./data/games");

const configRoutes = require("./routes");
const exphbs  = require('express-handlebars');
const Handlebars = require('handlebars');

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('tiny'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Configuration of local strategy for user authentification
passport.use(new LocalStrategy(
    function(username, password, cb) {
        users.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (!users.verifyPassword(user, password)) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    })
);

//Serialization and deserialization of user to keep session going
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const handlebarsInstance = exphbs.create({
    defaultLayout: 'login',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

configRoutes(app);

app.get('/',
  function(req, res) {
    res.render('games/login', { user: req.user });
  });

app.post('/login', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/' }));

app.post('/register',
    function(req, res){
        var data = {username: req.body.username,
                    password: req.body.password};
        users.addUser(data).then((user) => {
            res.redirect('/');
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    });

app.get('/dashboard',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
        if(req.user.profile.games.length == 0) {
            res.render('games/dashboard', {user: req.user});
            return;
        }
        var item = req.user.profile.games[Math.floor(Math.random()*req.user.profile.games.length)];
        games.getGameById(item).then((game) => {
            var wordToUse = game.keywords[Math.floor(Math.random()*game.keywords.length)];
            games.getGamesByKeyword(wordToUse).then((gameList) => {
                var finalList = [];
                for(var i = 0; i < 3 && i < gameList.length; i++)
                {
                    finalList[i] = gameList[i];
                }
                users.getPopularGames().then((popgames) => {
                    var finalArray = [];
                    var promises = [];

                    for(var i = 0; i < popgames.length; i++)
                    {
                        promises.push(games.getGameById(popgames[i][0]));
                    }

                    Promise.all(promises).then((values) =>{
                        res.render('games/dashboard', { user: req.user, game: game, games: finalList, popgames: values });
                    });

                }).catch(() => {
                    res.status(500).json({ error: "Server Error" });
                });
            });
        });
    });

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
        res.redirect('/users/' + req.user._id);
    });

app.put('/profile/:gameid',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
        users.addGameToUser(req.user._id, req.params.gameid).then((user) => {
            res.status(200).json({});
        }).catch((error)  => {
            res.status(500).json({ error: error });
        });
    });

app.get('/users/:id', 
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res) {
        users.getUserById(req.params.id).then((user) => {
            var finalArray = [];
            var gameArray = user.profile.games;
            for(var i = 0; i < gameArray.length; i++)
            {
                games.getGameById(gameArray[i]).then((game) => {
                    finalArray.push(game);
                });
            }

            res.render('games/profile', { 
                user: user,
                games: finalArray
            });
        }).catch(() => {
            res.status(404).json({ error: "User not found" });
        });
});

app.post("/games", 
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res) {
    var ss = req.body.searchStr;
    if(ss == "")
        res.render('games/search', { user: req.user });
    else{
        games.getGamesByKeyword(ss).then((gamelist) => {
            res.render('games/search', { games: gamelist, user: req.user });
        }).catch(()  => {
            res.sendStatus(500);
        });
    }
});


/*const allGames = require('./gameCollection');
var theGames = allGames.gameCol;
for(var j = 0; j < theGames.length; j++){
    var newGame = theGames[j];
    games.addGame(newGame);
    console.log(newGame.name);
}*/

app.listen(3000, () => {
    console.log("Website running on http://localhost:3000");
});