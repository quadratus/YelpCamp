var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comments");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet finibus velit eget ornare. Morbi gravida enim sodales lorem vestibulum, ut lacinia nisi vestibulum. Sed dignissim nisl eu nulla ultrices, id vestibulum nisl egestas. Maecenas sed enim in urna mattis convallis nec ac metus. Nam justo sem, molestie sit amet fermentum eu, bibendum in felis. Nunc gravida nisi id tortor pellentesque lobortis. Integer quis venenatis velit. Donec blandit vitae orci nec condimentum. Mauris mauris orci, tempus in ante sed, tempor sodales ipsum. Proin rutrum orci euismod hendrerit interdum. Phasellus viverra tincidunt quam.Aliquam elit ante, finibus in libero sit amet, eleifend aliquam nulla. Morbi a magna tellus. Aenean ut elit auctor, sodales justo vel, sodales ligula. Suspendisse at lorem gravida, accumsan est a, cursus ligula. Proin tristique eget nisi porttitor hendrerit. Pellentesque bibendum, magna eget accumsan porttitor, enim mi aliquet justo, quis venenatis dolor nulla vel libero. Ut semper tellus arcu, a sollicitudin enim consequat ut. Donec tincidunt consectetur nibh, at sollicitudin mi mollis et. "
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet finibus velit eget ornare. Morbi gravida enim sodales lorem vestibulum, ut lacinia nisi vestibulum. Sed dignissim nisl eu nulla ultrices, id vestibulum nisl egestas. Maecenas sed enim in urna mattis convallis nec ac metus. Nam justo sem, molestie sit amet fermentum eu, bibendum in felis. Nunc gravida nisi id tortor pellentesque lobortis. Integer quis venenatis velit. Donec blandit vitae orci nec condimentum. Mauris mauris orci, tempus in ante sed, tempor sodales ipsum. Proin rutrum orci euismod hendrerit interdum. Phasellus viverra tincidunt quam.Aliquam elit ante, finibus in libero sit amet, eleifend aliquam nulla. Morbi a magna tellus. Aenean ut elit auctor, sodales justo vel, sodales ligula. Suspendisse at lorem gravida, accumsan est a, cursus ligula. Proin tristique eget nisi porttitor hendrerit. Pellentesque bibendum, magna eget accumsan porttitor, enim mi aliquet justo, quis venenatis dolor nulla vel libero. Ut semper tellus arcu, a sollicitudin enim consequat ut. Donec tincidunt consectetur nibh, at sollicitudin mi mollis et. "
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet finibus velit eget ornare. Morbi gravida enim sodales lorem vestibulum, ut lacinia nisi vestibulum. Sed dignissim nisl eu nulla ultrices, id vestibulum nisl egestas. Maecenas sed enim in urna mattis convallis nec ac metus. Nam justo sem, molestie sit amet fermentum eu, bibendum in felis. Nunc gravida nisi id tortor pellentesque lobortis. Integer quis venenatis velit. Donec blandit vitae orci nec condimentum. Mauris mauris orci, tempus in ante sed, tempor sodales ipsum. Proin rutrum orci euismod hendrerit interdum. Phasellus viverra tincidunt quam.Aliquam elit ante, finibus in libero sit amet, eleifend aliquam nulla. Morbi a magna tellus. Aenean ut elit auctor, sodales justo vel, sodales ligula. Suspendisse at lorem gravida, accumsan est a, cursus ligula. Proin tristique eget nisi porttitor hendrerit. Pellentesque bibendum, magna eget accumsan porttitor, enim mi aliquet justo, quis venenatis dolor nulla vel libero. Ut semper tellus arcu, a sollicitudin enim consequat ut. Donec tincidunt consectetur nibh, at sollicitudin mi mollis et. "
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed Campgrounds");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis ligula eu lacus hendrerit tincidunt. Integer varius vitae sapien quis posuere. Mauris lectus mauris, eleifend et ex et, lacinia interdum mauris. Morbi auctor lacinia tortor, at mollis est tristique non. ",
                            author: "Charles Magnus"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
