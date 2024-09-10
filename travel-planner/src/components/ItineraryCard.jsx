import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Sun, Moon, Coffee, Utensils, Camera, Compass } from 'lucide-react';

function ItineraryCard({ itinerary }) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, details } = itinerary;

  const getIcon = (text) => {
    if (text.includes('Morning')) return <Sun className="inline-block mr-2 text-yellow-500" />;
    if (text.includes('Afternoon')) return <Coffee className="inline-block mr-2 text-brown-500" />;
    if (text.includes('Evening')) return <Moon className="inline-block mr-2 text-indigo-500" />;
    return <Compass className="inline-block mr-2 text-blue-500" />;
  };

  const formatDetails = (text) => {
    const lines = text.split('\n');
    let formatted = [];
    let currentList = null;

    const processLine = (line) => {
      return line.replace(/\*\*/g, '').trim();
    };

    lines.forEach((line, idx) => {
      const processedLine = processLine(line);
      
      if (line.includes('Overview:') || line.includes('Day')) {
        if (currentList) {
          formatted.push(<ul key={`list-${idx}`} className="mb-4">{currentList}</ul>);
          currentList = null;
        }
        formatted.push(
          <motion.h3 
            key={idx} 
            className="text-2xl font-bold mt-8 mb-4 text-teal-700 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Map className="inline-block mr-3 text-teal-600" />
            {processedLine}
          </motion.h3>
        );
      } else if (line.includes('Morning') || line.includes('Afternoon') || line.includes('Evening')) {
        if (currentList) {
          formatted.push(<ul key={`list-${idx}`} className="mb-4">{currentList}</ul>);
          currentList = null;
        }
        formatted.push(
          <motion.h4 
            key={idx} 
            className="text-xl font-semibold mt-6 mb-3 text-indigo-600 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {getIcon(processedLine)}
            {processedLine}
          </motion.h4>
        );
      } else if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        if (!currentList) currentList = [];
        currentList.push(
          <motion.li 
            key={`item-${idx}`} 
            className="ml-6 mb-2 flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.05 }}
          >
            <Camera className="inline-block mr-2 mt-1 flex-shrink-0 text-green-500" />
            <span>{processedLine.replace(/^\*|-/, '').trim()}</span>
          </motion.li>
        );
      } else if (processedLine !== '') {
        if (currentList) {
          formatted.push(<ul key={`list-${idx}`} className="mb-4">{currentList}</ul>);
          currentList = null;
        }
        formatted.push(
          <motion.p 
            key={idx} 
            className="mb-3 text-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.05 }}
          >
            {processedLine}
          </motion.p>
        );
      }
    });

    if (currentList) {
      formatted.push(<ul key="final-list" className="mb-4">{currentList}</ul>);
    }

    return formatted;
  };

  return (
    <motion.div
      layout
      className="bg-gradient-to-br from-sky-100 to-indigo-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-indigo-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-8">
        <motion.h2 
          className="text-3xl font-bold mb-4 text-indigo-800 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Compass className="inline-block mr-3 text-indigo-600" size={32} />
          {title.replace(/\*\*/g, '')}
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg font-semibold text-lg flex items-center"
        >
          {isOpen ? (
            <>
              <Utensils className="mr-2" /> Hide Itinerary
            </>
          ) : (
            <>
              <Map className="mr-2" /> View Itinerary
            </>
          )}
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-gray-800 overflow-hidden"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-h-[32rem] overflow-y-auto pr-4 custom-scrollbar"
              >
                {formatDetails(details)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default ItineraryCard;