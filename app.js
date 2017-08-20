//Loading dependencies.
var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comments = require("./models/comments"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");
    indexRoutes = require("./routes/index");

mongoose.Promise = require("bluebird");
//Connect app to MongoDB via mongoose.
//Will find a databse named yelp_camp, if not found then will
//create it.
mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
//Initializer for body parser.
app.use(bodyparser.urlencoded({ extended: true }));
//Set view engine to embedded javaScript.
app.set("view engine", "ejs");
//  seedDB();
app.use(express.static(__dirname + "/public"));
//Passport configuration
app.use(require("express-session")({
    secret: "You only got one shot,one opportunity.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, function (req, res) {
    console.log("Serving app on port 3000.");

})