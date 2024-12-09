import React from 'react';
import { TemperatureDisplay } from './TemperatureDisplay';

interface TemperatureRangeProps {
  min: number;
  max: number;
}

export function TemperatureRange({ min, max }: TemperatureRangeProps) {
  return (
    <div className="flex items-center space-x-4">
      <div>
        <span className="text-sm text-gray-600">Low</span>
        <TemperatureDisplay
          value={min}
          size="sm"
          showUnit={false}
        />
      </div>
      <div className="text-gray-300">/</div>
      <div>
        <span className="text-sm text-gray-600">High</span>
        <TemperatureDisplay
          value={max}
          size="sm"
          showUnit={true}
        />
      </div>
    </div>
  );
}