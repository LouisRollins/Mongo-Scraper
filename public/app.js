$("#scrapeButton").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(){
        $.getJSON("/articles", function(data) {
            for (var i = 0; i < data.length; i++) {
              $("#articles").append("<br /><p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "</p><button class='btn btn-danger saveThisArticle' data-id='" + data[i]._id + "'>Save Article</button><br />");
            }
          });
    })
    
});

$("#savedButton").on("click", function(){
  $.ajax({
    method: "GET",
    url: "/saved"
  }).then(function(data){
    $("#articles").empty();
      for (var i = 0; i < data.length; i++) {
        $("#articles").append("<br /><p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "</p><br />");
      }
  })
});

$(".scrapedContent").on('click','.saveThisArticle',function(){
 
  $.ajax({
    method: "POST",
    url: "/saveThis",
    data: {
      _id: $(this).data("id"),
      headline: $(this).data("headline"),
      summary: $(this).data("summary")      
      
    }
  })
});



