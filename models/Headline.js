var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var HeadlineSchema = new Schema({
  // `headLine` is required and of type String
  headline: {
    type: String,
    required: true,
    unique:true
  },
  // `summary` is required and of type String
  summary: {
    type: String,
    required: true
  },
  date:String,
  
  // // `url` is required and of type String
  // link: {
  //   type: String,
  //   required: true
  // },
  saved: {
    type: Boolean,
    default:false
  },

});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Article model
module.exports = Headline;
