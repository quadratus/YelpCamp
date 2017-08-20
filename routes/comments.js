var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comments");

//Comment routes
router.get("/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundIt) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: foundIt });
        }
    })
});

router.post("/", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camper) {
        if (err) {
            console.log(err);
        }
        else {
            Comments.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    camper.comments.push(comment);
                    camper.save();
                    res.redirect("/campgrounds/" + camper._id);
                }
            })
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;