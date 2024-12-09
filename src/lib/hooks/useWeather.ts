import useSWR from 'swr';
import { getWeatherData } from '../api/weather';
import { WeatherResponse } from '../types/weather';
import { useGeolocation } from './useGeolocation';

export function useWeather() {
  const { location } = useGeolocation();
  
  const { data, error, isLoading } = useSWR<WeatherResponse>(
    ['weather', location?.coordinates],
    () => getWeatherData(location),
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    data,
    location,
    isLoading,
    error
  };
}