import axios from 'axios';
import { format } from 'date-fns';
import { API_CONFIG } from './config';
import type { AirQualityData, AirQualityError } from './types/airQuality';

const openWeatherApi = axios.create({
  baseURL: API_CONFIG.OPENWEATHER_BASE_URL,
  params: {
    appid: API_CONFIG.OPENWEATHER_API_KEY,
  },
  timeout: 10000,
});

export async function getAirQualityData(
  lat = API_CONFIG.DEFAULT_LOCATION.lat,
  lon = API_CONFIG.DEFAULT_LOCATION.lon
): Promise<AirQualityData> {
  try {
    const [airPollution, weather] = await Promise.all([
      openWeatherApi.get('/air_pollution', { params: { lat, lon } }),
      openWeatherApi.get('/weather', { params: { lat, lon, units: 'metric' } })
    ]);

    if (!airPollution.data?.list?.[0] || !weather.data) {
      throw new Error('Invalid API response format');
    }

    const pollutionData = airPollution.data.list[0];
    const weatherData = weather.data;

    return {
      city: API_CONFIG.DEFAULT_LOCATION.city,
      country: API_CONFIG.DEFAULT_LOCATION.country,
      location: {
        lat,
        lon
      },
      current: {
        timestamp: format(new Date(pollutionData.dt * 1000), "yyyy-MM-dd'T'HH:mm:ssXXX"),
        temperature: {
          celsius: Math.round(weatherData.main.temp * 10) / 10,
          fahrenheit: Math.round((weatherData.main.temp * 9/5 + 32) * 10) / 10
        },
        humidity: weatherData.main.humidity,
        wind: {
          speed: {
            ms: weatherData.wind.speed,
            mph: Math.round(weatherData.wind.speed * 2.237 * 10) / 10
          },
          direction: weatherData.wind.deg
        },
        aqi: pollutionData.main.aqi,
        pollutants: {
          co: pollutionData.components.co,
          no: pollutionData.components.no,
          no2: pollutionData.components.no2,
          o3: pollutionData.components.o3,
          so2: pollutionData.components.so2,
          pm2_5: pollutionData.components.pm2_5,
          pm10: pollutionData.components.pm10,
          nh3: pollutionData.components.nh3
        }
      }
    };
  } catch (error: any) {
    console.error('Air quality API error:', error.response || error);
    const apiError: AirQualityError = {
      code: error.response?.data?.cod || error.code || 'UNKNOWN_ERROR',
      message: error.response?.data?.message || error.message || 'Failed to fetch air quality data'
    };
    throw apiError;
  }
}

export function validateAirQualityData(data: AirQualityData): boolean {
  if (!data || !data.current) return false;

  const now = new Date();
  const dataTime = new Date(data.current.timestamp);
  
  // Check if data is from within the cache time
  const isRecent = now.getTime() - dataTime.getTime() <= API_CONFIG.CACHE_TIME;

  // Check if essential data is present and valid
  const hasValidData = (
    data.current.aqi > 0 &&
    data.current.temperature.celsius !== 0 &&
    data.city && data.country
  );

  return isRecent && hasValidData;
}