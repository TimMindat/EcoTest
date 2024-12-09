import { useEffect } from 'react';
import useSWR from 'swr';
import { getWeatherData } from '../api/weather';
import { WeatherData } from '../types/weather';

export function useWeather() {
  const { data, error, isLoading, mutate } = useSWR<WeatherData | null>(
    'weather',
    () => getWeatherData(),
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Dedupe requests within 1 minute
    }
  );

  useEffect(() => {
    if (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [error]);

  return {
    data,
    isLoading,
    error,
    refresh: mutate
  };
}