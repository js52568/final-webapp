const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    reviewerId: String,
    userId: String,
    value: Number,
  });

  const Rating = new mongoose.model("Rating",RatingSchema);
  
  module.exports = Rating;

  // description: String