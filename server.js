var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
var PORT = process.env.PORT || 3000;
// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./routes/routes.js");

app.use(routes);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });


app.get("/scrape", function(req, res){
  axios.get("http://www.dccomics.com/news").then(function(response){
    var $ = cheerio.load(response.data);
    $(".views-row").each(function(i, element){
      var result={};
      result.headline= $(this)
        .children(".article-title").children("a")
        .text();
      result.summary= $(this)
        .children(".article-body")
        .text();
        db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("Success")
  })
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  