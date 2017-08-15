var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/demo",{useMongoClient: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

Cat.create({
    name: "CatKing",
    age: 14,
    temperament: "Bland"
},function(err,cat){
    if(err){
        console.log("Mistakes were made");
    }
    else{
        console.log("Mistakes werent made");
        console.log(cat);
    }
})

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",description: "Do not visit, very creepy"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg", description:"Do visit, not that bad."},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg", description:"Do visit, not that bad. The place is is a goldmine."},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", description:"Do visit, not that bad. The place is is a goldmine. This is coalmine."},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg", description:"Do visit, not that bad. The place is is a goldmine. What are you doing with your life."},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",description:"Do visit, not that bad. The place is is a goldmine."},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", description:"Do visit, not that bad. The place is gloriusss."},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",description:"Do visit, not that bad. The place is Westeros."},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg", description:"Do visit, not that bad. The place is is a goldmine."}
];

campgrounds.forEach(function(camp){
    Campground.create({
        name: camp.name,
        image: camp.image,
        description: camp.description
    },function(err,camp){
        if(err){
            console.log("Error"+err);
        }else{
            console.log("Success");
            console.log(camp);
        }
    })
})
