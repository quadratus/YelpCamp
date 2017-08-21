var mongoose = require("mongoose");

//Define comments schema
var comments = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

//Return it as an export.
module.exports = mongoose.model("Comments",comments);