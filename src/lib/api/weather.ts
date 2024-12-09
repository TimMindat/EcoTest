import axios from 'axios';
import { WeatherResponse } from '../types/weather';
import { Location } from '../types/location';
import { DEFAULT_LOCATION } from '../config/locations';

const WEATHER_API_KEY = '0f6278ac6aab4c35907220558240912';
const BASE_URL = 'https://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: WEATHER_API_KEY
  }
});

export async function getWeatherData(location: Location = DEFAULT_LOCATION) {
  try {
    const { lat, lon } = location.coordinates;
    const response = await weatherApi.get<WeatherResponse>('/forecast.json', {
      params: {
        q: `${lat},${lon}`,
        days: 3,
        aqi: 'yes'
      }
    });

    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}