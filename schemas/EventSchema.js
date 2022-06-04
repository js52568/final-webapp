const mongoose = require("mongoose");

const EventSchema = {
  name: String,
  sport: String,
  maxParticipants: Number,
  host: String,
  activity: String,               //je li bio ili ce biti ili u tijeku
  success: String,                // je li uspio? tj je li odrzan
  description: String,
  price: Number,
  ratingsIds: [Number],        
  duration: Number,         
  locationAddress: String,         //schema
  typeOfAccess: String,
  startTime: Date,
  endTime: Date,
  participantsIds: [String]
};

const Event = new mongoose.model("Event",EventSchema);

module.exports = Event;
