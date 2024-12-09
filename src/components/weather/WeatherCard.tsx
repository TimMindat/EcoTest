import React from 'react';
import { Cloud, AlertCircle, RefreshCw } from 'lucide-react';
import { useWeather } from '../../lib/hooks/useWeather';
import { useTemperatureRange } from '../../lib/hooks/useTemperatureRange';
import { TemperatureDisplay } from './TemperatureDisplay';
import { TemperatureRange } from './TemperatureRange';
import { WeatherDetails } from './WeatherDetails';
import { WeatherIcon } from './WeatherIcon';
import { CardHeader } from '../ui/CardHeader';
import { CardFooter } from '../ui/CardFooter';

export function WeatherCard() {
  const { data, isLoading: isWeatherLoading, error: weatherError, refresh } = useWeather();
  const { range, isLoading: isRangeLoading, error: rangeError } = useTemperatureRange();

  const isLoading = isWeatherLoading || isRangeLoading;
  const error = weatherError || rangeError;

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <div>
            <h3 className="text-xl font-bold">Error loading weather data</h3>
            <p className="text-sm text-gray-600 mt-1">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !data || !data.weather || data.weather.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const weatherInfo = data.weather[0];
  const { humidity, pressure, feels_like } = data.main;
  const { speed: windSpeed } = data.wind;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <CardHeader
        title="Weather"
        subtitle="Current Conditions"
        icon={Cloud}
        location={data.name}
      />

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <WeatherIcon
            code={weatherInfo.icon}
            description={weatherInfo.description}
          />
          <div>
            <TemperatureDisplay
              value={data.main.temp}
              size="lg"
            />
            <div className="text-gray-600 capitalize">
              {weatherInfo.description}
            </div>
          </div>
        </div>
        
        <TemperatureRange
          min={range.low}
          max={range.high}
          isValid={range.isValid}
        />
      </div>

      <WeatherDetails
        humidity={humidity}
        pressure={pressure}
        windSpeed={windSpeed}
        feelsLike={feels_like}
      />

      <CardFooter
        timestamp={data.dt}
        onRefresh={refresh}
        refreshIcon={RefreshCw}
      />
    </div>
  );
}