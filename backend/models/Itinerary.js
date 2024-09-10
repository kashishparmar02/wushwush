const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  duration: { type: Number, required: true },
  numOfPeople: { type: Number, required: false },
  interest: { type: String, required: false },
  budget: { type: Number, required: false },
  preferredActivities: { type: [String], required: false },
  tentativeDates: { type: [Date], required: true },
  dietaryRestrictions: { type: String, required: false },
  itineraryDetails: { type: Array, required: true }
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
