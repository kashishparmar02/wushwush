import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../utils/api';
import { FiMapPin, FiUser, FiCalendar, FiShoppingCart, FiDollarSign, FiActivity } from 'react-icons/fi';

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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-yellow-200 to-pink-300 p-4">
      {/* Animated Travel Icon */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cover bg-center animate-bounce"
          style={{ backgroundImage: 'url(/images/plane.png)' }}>
        </div>
      </div>

      <div className="relative w-full max-w-3xl p-8 space-y-6 bg-white rounded-xl shadow-lg backdrop-blur-lg bg-opacity-90 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-blue-700 font-heading">Plan Your Dream Trip</h2>
        {error && <div className="p-3 text-red-700 bg-red-100 border border-red-400 rounded">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 flex items-center">
                <FiMapPin className="mr-2" /> Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Paris"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 flex items-center">
                <FiCalendar className="mr-2" /> Duration (days)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., 7"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 flex items-center">
                <FiUser className="mr-2" /> Number of People
              </label>
              <input
                type="number"
                name="numOfPeople"
                value={formData.numOfPeople}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 flex items-center">
                <FiActivity className="mr-2" /> Interests
              </label>
              <input
                type="text"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-red-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Adventure, Relaxation"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 flex items-center">
                <FiDollarSign className="mr-2" /> Budget (INR)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., 200000"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 flex items-center">
                <FiShoppingCart className="mr-2" /> Preferred Activities
              </label>
              <input
                type="text"
                name="preferredActivities"
                value={formData.preferredActivities}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Sightseeing, Dining, Shopping"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700 flex items-center">
              <FiCalendar className="mr-2" /> Start Date
            </label>
            <DatePicker
              selected={formData.startDate}
              onChange={handleDateChange}
              className="w-full px-4 py-3 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholderText="Select start date"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Dietary Restrictions</label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g., Vegetarian"
            />
          </div>
        
          <button
            type="submit"
            className={`w-full px-6 py-3 mt-6 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md focus:outline-none ${isLoading ? 'animate-pulse' : ''}`}
          >
            {isLoading ? 'Planning Your Trip...' : 'Create Itinerary'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItineraryForm;
