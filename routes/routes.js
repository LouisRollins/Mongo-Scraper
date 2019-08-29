var express = require('express');
var router = express.Router();
router.get("/", function(req, res) {
    // Article.all(function(data) {
    //   var hbsObject = {
    //     Article: data
    //   };
    //   console.log(hbsObject);
      res.render("index.handlebars");
    });
  // });
  // router.get("/saved", function(req, res){
  //   res.render("saved.handlebars")
  // })

module.exports = router
  
