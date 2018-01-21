var cheerio = require("cheerio");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var exphbs = require("express-handlebars");

var db = require('./models');

var app = express();
var router = express.Router();

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


  var $ = cheerio.load(html);


  $('h3.article__headline').each(function(i, element) {

    var result = {};

    result.title = $(element).children("a").text();

    result.link = $(element).children("a").attr("href");

 
   db.Article
   .create(result)
   .then(function(dbArticle) {

   })
   .catch(function(err) {
    return res.json(err);
  })
 
 })
 
})

res.redirect("/articles")

})

app.get("/",function(req,res){

  res.render("index");


})


app.get("/articles",function(req,res){

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


app.post("/articles/:id",function(req,res){
console.log(req.body);
db.Article
.findByIdAndUpdate(req.params.id,{$set:req.body},{new : true},function(err,edited){
  if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        
        res.send(edited);
      }
  });
});

app.get("/savedarticles",function(req,res){
  db.Article.find({saved:true}).populate("note").then(function(savedArticle) {
     

      var savarticleObj = {
        savarticles : savedArticle
      }
   
      res.render("saved",savarticleObj)
    })
  .catch(function(err) {
    res.json(err);
  });
});

app.get("/createnotes/:id",function(req,res){
  console.log(req.params.id)
  db.Article
 .findOne({ _id: req.params.id })
   // ..and populate all of the notes associated with it
   .populate('note')
   .then(function(dbArticle) {
     // If we were able to successfully find an Article with the given id, send it back to the client
     res.json(dbArticle);

         //res.render('saved',dbArticle);
 })
   .catch(function(err) {
     // If an error occurred, send it to the client
     res.json(err);
 });
});








app.post("/createnotes/:id",function(req,res){
  console.log(req.body)
  console.log(req.params.id)
   db.Note
   .create(req.body)
   .then(function(dbNote){
     
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then(function(dbArticle){
      console.log("notes",dbArticle)
      res.json(dbArticle);
    })
  .catch(function(err) {
    res.json(err);
  });

})

app.post("/notes/:id", function(req,res){

  console.log(req.params.id);
  db.Note.findByIdAndRemove({_id: req.params.id}, function (err, deletedNote) {

    if (err) {
      console.log(err);
    } else {
        res.send(deletedNote);
    }
  



  });

})




app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


