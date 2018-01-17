var cheerio = require("cheerio");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var exphbs = require("express-handlebars");
//var rp = require('request-promise');
var db = require('./models');
// var Promise = require('bluebird');
var app = express();

// var Article = ("./models/Article");
// var Note = ("./models/Note");
var PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/webscraper',{
  useMongoClient: true
});


app.get("/scrape",function(req,res){

  request("https://www.marketwatch.com/",function(err,response,html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);


  $('h3.article__headline').each(function(i, element) {

    var result = {};

    result.title = $(element).children("a").text();

    result.link = $(element).children("a").attr("href");

  	// console.log("result title",result.title);
   //  console.log("result link",result.link);

   //    // var entry = new Article(result);

   //    console.log(result);
   db.Article
   .create(result)
   .then(function(dbArticle) {
      //console.log(dbArticle)
      //res.redirect('/articles')
  })
   .catch(function(err) {
    return res.json(err);
  })
 
 })
  db.Article.find({
  }).then(function(dbArticle) {
      // res.json(dbArticle);

      var articleObj = {
        articles : dbArticle
      }
      res.render("index",articleObj)
    })
  .catch(function(err) {
    res.json(err);
  });

})

  //res.render("index");
})

app.get("/",function(req,res){

  res.render("index");


})


app.post("/articles/:id",function(req,res){
console.log(req.body);
db.Article
.findByIdAndUpdate(req.params.id,{$set:req.body},{new : true},function(err,edited){
  if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        
        console.log(edited);
        //res.send(edited);
      }
  });
});

app.get("/savedarticles",function(req,res){
  db.Article.find({saved:true}).then(function(savedArticle) {
      // res.json(dbArticle);

      var savarticleObj = {
        savarticles : savedArticle
      }
      res.render("saved",savarticleObj)
    })
  .catch(function(err) {
    res.json(err);
  });
});


// app.get("/savedarticles:id",function(req,res){
//   db.Article.remove(req.params.id).then(function(savedArticle) {
//       // res.json(dbArticle);

//       var savarticleObj = {
//         savarticles : savedArticle
//       }
//       res.render("saved",savarticleObj)
//     })
//   .catch(function(err) {
//     res.json(err);
//   });
// });






app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


