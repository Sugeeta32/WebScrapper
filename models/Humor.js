// Require mongoose library
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HumorSchema = new Schema({
    title: {
      type: String,
      required: true
      
    },
    link: {
      type: String,
      required: false
    }
  });
  // Create model from schema using model method
var Humor = mongoose.model("Humor", HumorSchema);

//export the Humor Model
module.exports = Humor;