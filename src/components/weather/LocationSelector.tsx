import React, { useState } from 'react';
import { MapPin, Search, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Location } from '../../lib/types/weather';

interface LocationSelectorProps {
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
}

const RECENT_LOCATIONS: Location[] = [
  {
    name: 'Cairo',
    coordinates: { lat: 30.0444, lon: 31.2357 }
  },
  {
    name: 'Alexandria',
    coordinates: { lat: 31.2001, lon: 29.9187 }
  },
  {
    name: 'Giza',
    coordinates: { lat: 30.0131, lon: 31.2089 }
  }
];

export function LocationSelector({ selectedLocation, onLocationChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationSelect = (location: Location) => {
    onLocationChange(location);
    setIsOpen(false);
    setSearchQuery('');
  };

  const filteredLocations = RECENT_LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span>{selectedLocation.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-72 bg-white rounded-lg shadow-lg"
          >
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {filteredLocations.map((location) => (
                  <button
                    key={`${location.coordinates.lat}-${location.coordinates.lon}`}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md"
                  >
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{location.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}