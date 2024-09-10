const express = require('express');
const { createItinerary, saveItinerary } = require('../controllers/itineraryController');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

// Route to generate itineraries
router.post('/create', verifyToken, createItinerary);


module.exports = router;
