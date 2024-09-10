// src/pages/ItineraryForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../utils/api';

function ItineraryForm() {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    numOfPeople: '',
    interest: '',
    budget: '',
    preferredActivities: '',
    startDate: null,
    dietaryRestrictions: '',
    itineraryDetails: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const data = {
      destination: formData.destination,
      duration: Number(formData.duration),
      numOfPeople: formData.numOfPeople ? Number(formData.numOfPeople) : undefined,
      interest: formData.interest || undefined,
      budget: formData.budget ? Number(formData.budget) : undefined,
      preferredActivities: formData.preferredActivities
        ? formData.preferredActivities.split(',').map((act) => act.trim())
        : undefined,
      startDate: formData.startDate,
      dietaryRestrictions: formData.dietaryRestrictions || undefined,
      itineraryDetails: formData.itineraryDetails ? formData.itineraryDetails.split(';').map((item) => item.trim()) : [],
    };

    try {
      const res = await api.post('/itinerary/create', data);
      setIsLoading(false);
      navigate('/itinerary-list', { state: { itineraries: res.data.itineraries } });
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || 'Failed to create itinerary');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 to-orange-100 p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-yellow-700">Create Your Dream Itinerary</h2>
        {error && <div className="p-3 text-red-700 bg-red-100 border border-red-400 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Paris"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., 7"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Number of People</label>
              <input
                type="number"
                name="numOfPeople"
                value={formData.numOfPeople}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Interest</label>
              <input
                type="text"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Adventure, Relaxation"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Budget (INR)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., 200000"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Preferred Activities</label>
              <input
                type="text"
                name="preferredActivities"
                value={formData.preferredActivities}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Sightseeing, Dining, Shopping"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
            <DatePicker
              selected={formData.startDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholderText="Select start date"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Dietary Restrictions</label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g., Vegetarian"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Additional Details</label>
            <textarea
              name="itineraryDetails"
              value={formData.itineraryDetails}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Any specific requests or preferences..."
              rows={"4"}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Itinerary'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItineraryForm;