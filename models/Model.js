// Require mongoose library
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    title: {
      type: String,
     
      required: true
      
    },
    link: {
      type: String,
      required: true
    },
    comments: {
      type: Array
    },
    saved: {
      type: Boolean,
      default: false
    }
    
  });
  // Create model from schema using model method
var Model = mongoose.model("Model", ModelSchema);

//export the Humor Model
module.exports = Model;