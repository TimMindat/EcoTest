export interface WeatherData {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  name: string;
}

export interface WeatherAPIForecast {
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
      };
    }>;
  };
}

export interface TemperatureRange {
  high: number;
  low: number;
  isValid: boolean;
}

export interface WeatherCardProps {
  className?: string;
}