import React from 'react';
import { formatTemperature, getTemperatureColor } from '../../lib/utils/temperature';

interface TemperatureDisplayProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showUnit?: boolean;
}

export function TemperatureDisplay({ 
  value, 
  label, 
  size = 'md',
  showUnit = true 
}: TemperatureDisplayProps) {
  const textColor = getTemperatureColor(value);
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div>
      {label && (
        <div className="text-sm text-gray-600 mb-1">{label}</div>
      )}
      <div className={`font-bold ${sizeClasses[size]} ${textColor}`}>
        {formatTemperature(value, showUnit ? 'C' : undefined)}
      </div>
    </div>
  );
}