import { useEffect, useState } from 'react';
import { useWeather } from './useWeather';
import { validateTemperature } from '../utils/temperature';

interface TemperatureRange {
  min: number;
  max: number;
  isValid: boolean;
}

export function useTemperatureRange() {
  const { data, error, isLoading } = useWeather();
  const [range, setRange] = useState<TemperatureRange>({
    min: 0,
    max: 0,
    isValid: false
  });

  useEffect(() => {
    if (data?.main) {
      const { temp_min, temp_max } = data.main;
      const isMinValid = validateTemperature(temp_min);
      const isMaxValid = validateTemperature(temp_max);

      setRange({
        min: temp_min,
        max: temp_max,
        isValid: isMinValid && isMaxValid && temp_min <= temp_max
      });
    }
  }, [data]);

  return {
    range,
    isLoading,
    error
  };
}