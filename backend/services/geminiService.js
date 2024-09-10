const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Function to generate itineraries from the Gemini API
const generateItineraryFromGemini = async (params) => {
  try {
    // Build the prompt to request a day-wise breakdown of itineraries
    let prompt = `Generate 4 detailed travel itineraries for a trip to ${params.destination} lasting ${params.duration} days. Each itinerary should include:

1. An overview with a theme (e.g., Adventure, Historical, Cultural).
2. A day-wise breakdown of activities for each day of the trip.
3. Recommendations for meals, activities, and attractions for each day.
4. Ensure the response is structured as follows:
   - Option 1: [Theme] - [Overview]
     - Day 1: [Activities and recommendations]
     - Day 2: [Activities and recommendations]
     - Day 3: [Activities and recommendations]
     - ...
     - Day N: [Activities and recommendations]
   - Option 2: [Theme] - [Overview] (Repeat the same structure)
   - Option 3: [Theme] - [Overview] (Repeat the same structure)
   - Option 4: [Theme] - [Overview] (Repeat the same structure)

If the parameters for theme are not provided, include diverse themes in each itinerary to cover different interests.
also the budget is in indian rupees (INR)

Make sure the response is well-organized and follows this format so it can be easily used to create frontend cards.`;

    if (params.budget) prompt += ` Budget: $${params.budget}.`;
    if (params.interest) prompt += ` Interest: ${params.interest}.`;
    if (params.activities) prompt += ` Activities: ${params.activities}.`;
    if (params.dietaryRestrictions) prompt += ` Dietary Restrictions: ${params.dietaryRestrictions}.`;
    

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Return the response text
    return responseText;
  } catch (err) {
    console.error('Error generating itinerary from Gemini API:', err);
    throw new Error('Failed to generate itinerary from Gemini API.');
  }
};

// Function to process the response into a structured format
const processItineraryResponse = (responseText) => {
  const itineraries = [];
  
  // Split the response based on options (assuming they are separated by "Option")
  const options = responseText.split(/Option \d+:/);

  options.forEach((optionText, index) => {
    if (index === 0) return; // Skip the first split part if it's empty or irrelevant

    const [title, ...details] = optionText.split('\n\n'); // Assuming sections are separated by double newlines
    const itinerary = {
      option: `Option ${index}`,
      title: title.trim(),
      details: details.join('\n\n').trim(),
    };
    itineraries.push(itinerary);
  });

  return itineraries;
};

// Usage
const generateAndProcessItinerary = async (params) => {
  const responseText = await generateItineraryFromGemini(params);
  const itineraries = processItineraryResponse(responseText);
  return itineraries;
};

module.exports = { generateAndProcessItinerary };
