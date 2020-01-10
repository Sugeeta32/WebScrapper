var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// var Humor = require("./models/humors.js")
var db = require("./models");
var PORT = process.env.PORT || 8000;

//intialize express
var app = express();
app.use(logger("dev"));

//middleware config
//json  for request body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//public as static folder
app.use(express.static("public"));

//var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://localhost/humors_db",{ useNewUrlParser: true });
//mongoose.connect(MONGODB_URI);


mongoose.connect("mongodb://localhost:27017/headScrapper", { useNewUrlParser: true,useUnifiedTopology: true })
 
// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname + "./public/index.html"))

// });
// app.get("/all", function(req, res) {
//     // Find all results from the scrapedData collection in the db
//     db.humor.find({}, function(error, found) {
//       // Throw any errors to the console
//       if (error) {
//         console.log(error);
//       }
//       // If there are no errors, send the data to the browser as json
//       else {
//         res.json(found);
//       }
//     });
//   });
//Making a request via axios
// Rewriting the code into a function
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function (req, res) {
    axios.get("https://www.babble.com/tag/humor/").then(function (response) {

        var $ = cheerio.load(response.data);

        $("article div.bb-article-title").each(function (i, elem) {
            var result = {};
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            // var humor = ($(elem).text());
            // var link = $(elem).attr("href");

            console.log(result);
            

            // Insert the data in the scrapedData db
            db.Humor.create(result)
                .then(function (dbHumor) {
                    console.log(dbHumor);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
        // Send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
    });
});

//Homepage route

// app.get("/humors",function(req,res){
//     Humor.find({}).then(function(savedHumors){
//         res.json(savedHumors);
//     }).catch(function(err){
//         res.json(err);
//     });
// });

// app.post("/humors/scrape/:searchTerm", function(req,res){
//     scrape(req.params.searchTerm).then(function(foundHumors){
//         console.log(foundHumors);
//         foundHumors.forEach(function(eachHumor){
//             Humor.create(eachHumor).then(function(savedHumor){
//                 console.log(savedHumor)
//             }).catch(function(err){
//                 console.log(err.message);
//             });
//         });
//         res.json(foundHumors);
//     })
//     .catch(function(err){
//         res.json(err);
//     });
// });
//start the server
app.listen(PORT, function () {
    console.log("Port listening on " + PORT)
});