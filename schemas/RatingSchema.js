const mongoose = require("mongoose");

const RatingSchema = {
    reviewerId: String,
    userId: String,
    value: Number,
    description: String
  };

  const Rating = new mongoose.model("Rating",RatingSchema);
  
  module.exports = Rating;