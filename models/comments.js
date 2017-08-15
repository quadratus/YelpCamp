var mongoose = require("mongoose");

//Define comments schema
var comments = new mongoose.Schema({
    text: String,
    author: String
})

//Return it as an export.
module.exports = mongoose.model("Comments",comments);