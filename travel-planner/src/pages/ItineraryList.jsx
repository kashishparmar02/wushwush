import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItineraryCard from '../components/ItineraryCard';
import { removeToken } from '../utils/auth';

function ItineraryList() {
  const location = useLocation();
  const navigate = useNavigate();
  const itineraries = location.state?.itineraries || [];

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="flex items-center justify-between p-4 bg-purple-600 shadow-md">
        <h1 className="text-2xl font-bold text-white">Your Itineraries</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </header>
      <main className="container mx-auto p-6">
        {itineraries.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No itineraries found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itineraries.map((itinerary, index) => (
              <ItineraryCard key={index} itinerary={itinerary} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ItineraryList;