var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")

var app = express();

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected!")
});


request("https://www.marketwatch.com/", function(error, response,html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  

  $('h3.article__headline').each(function(i, element) {

  	var result = {};

  	result.title = $(element).children("a").text();

  	result.link = $(element).children("a").attr("href");

  	

  	db.test
        .create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });

  });

  //console.log(results);
});