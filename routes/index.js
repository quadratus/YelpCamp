var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function (req, res) {
    res.render("landing");
})

//REGISTER ROUTES

app.get("/register", function (req, res) {
    res.render("register");
})
app.post("/register", function (req, res, next) {
    //We pass only the username to the database. Passport takes the password and generates a hash value and salt and stores in the User model.
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN ROUTES

app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "login"
}), function (req, res) { });

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;