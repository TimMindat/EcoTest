import React from 'react';
import { Wind, AlertCircle, Loader2 } from 'lucide-react';
import { useAirQuality } from '../lib/api/hooks/useAirQuality';
import { format } from 'date-fns';

function getAQILabel(aqi: number) {
  if (aqi === 1) return { text: 'Good', color: 'text-green-600', bgColor: 'bg-green-600', width: '20%' };
  if (aqi === 2) return { text: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-600', width: '40%' };
  if (aqi === 3) return { text: 'Moderate', color: 'text-orange-600', bgColor: 'bg-orange-600', width: '60%' };
  if (aqi === 4) return { text: 'Poor', color: 'text-red-600', bgColor: 'bg-red-600', width: '80%' };
  return { text: 'Very Poor', color: 'text-purple-600', bgColor: 'bg-purple-600', width: '100%' };
}

export function AirQualityCard() {
  const { data, error, isLoading, refresh } = useAirQuality();

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <h3 className="text-xl font-bold">Error loading air quality data</h3>
          </div>
          <button
            onClick={() => refresh()}
            className="text-sm text-green-600 hover:text-green-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <h3 className="text-xl font-bold">Loading air quality data...</h3>
        </div>
      </div>
    );
  }

  const { text, color, bgColor, width } = getAQILabel(data.current.aqi);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Wind className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="text-xl font-bold">{data.city} Air Quality</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(data.current.timestamp), 'PPpp')}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* AQI Indicator */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Air Quality Index</span>
            <span className={`text-sm font-medium ${color}`}>{text}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${bgColor} h-2 rounded-full transition-all duration-500`}
              style={{ width }}
            ></div>
          </div>
        </div>

        {/* Weather Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-700">Temperature</span>
            <p className="text-lg">
              {data.current.temperature.celsius}°C /{' '}
              {data.current.temperature.fahrenheit}°F
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Humidity</span>
            <p className="text-lg">{data.current.humidity}%</p>
          </div>
        </div>

        {/* Pollutants */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Pollutants (μg/m³)</h4>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(data.current.pollutants).map(([key, value]) => (
              <div key={key}>
                <span className="text-sm font-medium text-gray-600">{key.toUpperCase()}</span>
                <p className="text-lg">{Math.round(value)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wind Information */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Wind</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Speed</span>
              <p className="text-lg">
                {data.current.wind.speed.ms} m/s ({data.current.wind.speed.mph} mph)
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Direction</span>
              <p className="text-lg">{data.current.wind.direction}°</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}