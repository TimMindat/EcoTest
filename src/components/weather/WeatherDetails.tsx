import React from 'react';
import { TemperatureDisplay } from './TemperatureDisplay';

interface WeatherDetailsProps {
  humidity: number;
  pressure: number;
  windSpeed: number;
  feelsLike: number;
}

export function WeatherDetails({
  humidity,
  pressure,
  windSpeed,
  feelsLike
}: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">Humidity</div>
        <div className="text-lg font-semibold">{humidity}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">Wind Speed</div>
        <div className="text-lg font-semibold">{windSpeed} m/s</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">Pressure</div>
        <div className="text-lg font-semibold">{pressure} hPa</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">Feels Like</div>
        <TemperatureDisplay
          value={feelsLike}
          size="sm"
        />
      </div>
    </div>
  );
}