var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
      type: String,
      required: true
    },
    summary: {
        type: String,
        required: true
    },
    // `comment` is an object that stores a comment id
    // The ref property links the ObjectId to the comments model
    // This allows us to populate the Article with an associated comment
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  });

  var Article = mongoose.model("Article", ArticleSchema);

  module.exports = Article;
  
