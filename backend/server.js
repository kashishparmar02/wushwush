const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const itineraryRoutes = require('./routes/itineraryRoutes'); // Updated path
const userRoutes = require('./routes/userRoutes'); // Updated auth routes

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/itinerary', itineraryRoutes); // Itinerary-related routes
app.use('/api/auth', userRoutes); // Authentication-related routes

// MongoDB Connection
const mongoURI = process.env.MONGO_URI ;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
