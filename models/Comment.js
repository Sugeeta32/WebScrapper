// Require mongoose library
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    name: {
      type: String,
       },
    body: {
      type: String,
      required: true
    }
  });
  // Create model from schema using model method
var Comment = mongoose.model("Comment", CommentSchema);

//export the Humor Model
module.exports = Comment;