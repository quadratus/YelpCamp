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


//Connect app to MongoDB via mongoose.
//Will find a databse named yelp_camp, if not found then will
//create it.
mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});
//Initializer for body parser.
app.use(bodyparser.urlencoded({extended: true}));
//Set view engine to embedded javaScript.
app.set("view engine","ejs");
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
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.get("/",function(req,res){
    res.render("landing");
})

app.get("/campgrounds",function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    })
    
})

app.post("/campgrounds",function(req,res){
    var name = req.body.name;   //Uses body-parser to get form data. name is the name of the form.
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc};
    Campground.create(newCampground,function(err,object){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
    
})

app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});

//Matches when anything is there after campgrounds/
app.get("/campgrounds/:id", function(req,res){
    //Store the :id in a varible. This is the unique ID of the campground.
    var iid = req.params.id;

    //Find campground using its ID. It is a mongoose function.
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            //If campground is found, then send it to show.ejs
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
})

//Comment routes
app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err, foundIt){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: foundIt});
        }
    })
});

app.post("/campgrounds/:id/comments",function(req,res){
    Campground.findById(req.params.id, function(err,camper){
        if(err){
            console.log(err);
        }
        else{
            Comments.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    camper.comments.push(comment);
                    camper.save();
                    res.redirect("/campgrounds/"+camper._id);
                }
            })
        }
    });   
});

app.get("/register",function(req,res){
    res.render("register");
})
app.post("/register",function(req,res){
    User.register(new User({username: req.body.username}),req.body.passport,function(err,user){
        if(err){
            console.log(err);
            res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        })
    });
})
app.listen(3000,function(req,res){
    console.log("Serving app on port 3000.");

})