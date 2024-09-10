const { generateAndProcessItinerary } = require('../services/geminiService');
const Itinerary = require('../models/Itinerary');

// Generate itineraries via Gemini API and process the response
const createItinerary = async (req, res) => {
  try {
    // Generate and process itineraries
    const itineraries = await generateAndProcessItinerary(req.body);

    // Send the processed itineraries to the frontend
    res.json({ itineraries });
  } catch (err) {
    console.error('Error in createItinerary controller:', err);
    res.status(500).json({ error: 'Failed to generate itinerary. Please try again.' });
  }
};


module.exports = { createItinerary };
