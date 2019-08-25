var express = require('express');
var router = express.Router();
router.get("/", function(req, res) {
    // Article.all(function(data) {
    //   var hbsObject = {
    //     Article: data
    //   };
    //   console.log(hbsObject);
      res.render("index.handlebars");
    // });
  });

module.exports = router
  
