var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })

})

router.post("/",middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;   //Uses body-parser to get form data. name is the name of the form.
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: desc, author: author };
    Campground.create(newCampground, function (err, object) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })

})

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//Matches when anything is there after campgrounds/
router.get("/:id", function (req, res) {
    //Store the :id in a varible. This is the unique ID of the campground.
    var iid = req.params.id;

    //Find campground using its ID. It is a mongoose function.
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //If campground is found, then send it to show.ejs
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
})
//Campground edit route.
router.get("/:id/edit",middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground})
    })
})

//Campground update route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,
        function (err, updatedCampground) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        })
});

router.delete("/:id", middleware.checkCampgroundOwnership,function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

module.exports = router;