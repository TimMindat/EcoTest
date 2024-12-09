import axios from 'axios';
import { WeatherData } from '../types/weather';

const OPENWEATHER_API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const API_TIMEOUT = 10000;

const api = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getWeatherData(
  lat: number = 30.0444,
  lon: number = 31.2357
): Promise<WeatherData | null> {
  try {
    const response = await api.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}