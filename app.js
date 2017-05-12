const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
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

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

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

app.get('/',
  function(req, res) {
    res.render('games/login', { user: req.user });
  });

app.get('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
});

app.post('/login',
    function(req, res){
        var data = {username: req.body.username,
                    password: req.body.password};
        console.log(data);
        users.addUser(data).then((user) => {
            res.redirect('/profile');
        }).catch(() => {
            res.sendStatus(500);
        });
    });

app.get('/dashboard',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
        res.render('games/dashboard', { user: req.user });
    });

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
        res.redirect('/users/' + req.user._id);
    });

app.post('/profile/:gameid',
    function(req, res){
        users.addGameToUser(req.user._id, req.params.gameid).then((user) => {
            //res.redirect('/dashboard');
        }).catch(()  => {
            res.sendStatus(500);
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

/*
app.get("/games/:gameid", (req, res) => {
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res) {
        games.getGameById(req.params.id).then((game) => {
            res.render('games/single', { game: game });
        }).catch(() => {
            res.status(404).json({error: "Game not found" });
        });   
    }
});*/

app.listen(3000, () => {
    console.log("Website running on http://localhost:3000");
});