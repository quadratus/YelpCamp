var mongoose  = require("mongoose");

//Define databse schema,analogous to CREATE TABLE in SQL.  
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
});

 //Generate model from schema and return it as an export.
 module.exports = mongoose.model("Campground",campgroundSchema);