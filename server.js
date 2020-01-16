const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");


var routes = require("./controller/routes.js");
var PORT = process.env.PORT || 8000;

//intialize express
var app = express();
//public as static folder
app.use(express.static(__dirname + "/public"));
//json  for request body parser
app.use(bodyParser.json());
//middleware config
app.use(bodyParser.urlencoded({
    extended: false
}))



app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to Mongo
mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds263448.mlab.com:63448/heroku_7sdtlhfz";
mongoose.connect(MONGODB_URI, { useMongoClient: true });
console.log("Mongo URI " + MONGODB_URI);


//USE CONTROLLER ROUTES
app.use("/", routes);
// app.use(app.router);
//  routes.initialize(app);


app.listen(PORT, function () {
    console.log("Port listening on " + PORT)
});