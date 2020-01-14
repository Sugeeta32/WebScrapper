const express    = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const mongoose   = require("mongoose");

//const config = require("./config").init();
var routes = require("./controller/routes.js");
var PORT = process.env.PORT || 8000;

//intialize express
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
    //middleware config
    //json  for request body parser
    //app.use(express.json());
    
    
    //app.use(express.urlencoded({ extended: true }));
    
    //public as static folder
    
    app.engine("handlebars", handlebars({ defaultLayout: "main" }));
    app.set("view engine", "handlebars");

//var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://localhost/humors_db",{ useNewUrlParser: true });
//mongoose.connect(MONGODB_URI);
// mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI,{useNewUrlParser: true});

// mongoose.connect("mongodb://localhost/headScrapper", { useMongoClient: true});


 //const db = mongoose.connection;

//Log mongoose errors
//  db.on("error", error => console.log("Mongoose Error: ", error));
// //Log connection success
//  db.once("open", () => console.log("Mongoose connection successful."));

//USE CONTROLLER ROUTES
app.use( "/",routes);
// app.use(app.router);
//  routes.initialize(app);


app.listen(PORT, function () {
    console.log("Port listening on " + PORT)
});