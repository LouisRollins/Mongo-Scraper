$("#scrapeButton").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(){
        $.getJSON("/articles", function(data) {
            for (var i = 0; i < data.length; i++) {
              $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "</p><button class='btn btn-danger saveThisArticle' data-id='" + data[i]._id + "'>Save Article</button>");
            }
          });
    })
    
});

$("#savedButton").on("click", function(){
  $.ajax({
    method: "GET",
    url: "/saved"
  }).then(function(data){
    $.getJSON("/saved", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "</p>");
      }
    });
  })
});

$(".saveThisArticle").on("click", function(){
  $.ajax({
    method: "POST",
    url: "/saveThis",
    data: {
      _id: this._id,
      headline: this.headline,
      summary: this.summary
    }
  })
})

// $(".commentButton").on("click", function(){
//   $.ajax({
//     method: "PUT",
//     url: "/comments"
//   })
// })
