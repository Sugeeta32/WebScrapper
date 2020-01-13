//DEPENDENCIES
const express = require("express");
// const bodyParser = require("body-parser");
// const handlebars = require("express-handlebars");
const cheerio = require("cheerio");
// const request    = require("request-promise");
const mongoose = require("mongoose");
var axios = require("axios");
const Model = require("../models/model.js");

const app = express();
mongoose.Promise = Promise;

app.get("/", function (req, res) {
    axios.get("https://www.babble.com/tag/friendship/").then(function (response) {
        

        var $ = cheerio.load(response.data);
        var results = [];
        //var resultArray = [];
        $("article div.bb-article-title").each(function (i, elem) {
            
            var title = $(elem).children("a").text();
            var link = $(elem).children("a").attr("href");
            // var humor = ($(elem).text());
            // var link = $(elem).attr("href");
            results.push({
                title: title,
                link: link
            });
        });
        //console.log(results);

        //resultArray.push(result);
        // Insert the data in the scrapedData db
        results.forEach(result => {
            Model.find({ title: result.title }, (err, data) => {
                if (err) return handleError(err);
                if (data == "" && result.title !== "")
                    Model.create({ title: result.title, link: result.link });
            });
        });
        Model.find({}, (err, data) => {
            if (err) return handleError(err);
            results = [];
            results = data.reverse();
            res.render("index", { results });
            console.log(results);

        });


    });

});
app.get('/saved', (req, res) => {

    Model.find({ saved: true }, (err, data) => {
        if (err) return handleError(err);
        results = [];
        results = data;
        res.render("saved", { results });
    });
});


app.get('/notes:id', (req, res) => {
    Model.findById({ _id: req.params.id }, (err, article) => { res.json(article); });
});


app.post('/comment', (req, res) => {

    let commentData = { comment: req.body.comment };


    Model.updateOne({ _id: req.body.id }, { $push: { comments: commentData } }).exec((err, result) => {
        if (err) throw err;
    });
});


app.put('/save:id', (req, res) => {
    let id = req.params.id;
    Model.findByIdAndUpdate({ _id: id }, { saved: true }, (err, result) => {
        if (err) throw err;
    });
});


app.put('/remove:id', (req, res) => {
    let id = req.params.id;
    Model.findByIdAndUpdate({ _id: id }, { saved: false }, (err, result) => {
        if (err) throw err;
    });
});


module.exports = app; 