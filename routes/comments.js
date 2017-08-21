var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comments = require("../models/comments");

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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camper.comments.push(comment);
                    camper.save();
                    res.redirect("/campgrounds/" + camper._id);
                }
            })
        }
    });
});

router.get("/:comment_id/edit", function (req, res) {
    Comments.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
});

router.put("/:comment_id", function (req, res) {
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

rotuer.delete("/:comment_id",function(req,res){
    Comments.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
        }else{
            res.render("/campgrounds/"+ req.params.id);
        }
    })
})

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;