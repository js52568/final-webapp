const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  nickname: String,
  password: String,
  googleId: String,
  description: String,
  picture: String,
  friendsIds: [String],
  invitationsIds: [String],    
  ratingIds: [String],        
  friendRequestsIds: [String], 
  cancelationsIds: [String],
  eventsIds: [String],
  hostedEventsIds: [String],
  yearOfBirth: Number
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User",userSchema);

module.exports = User;