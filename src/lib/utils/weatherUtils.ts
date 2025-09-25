import { 
  TemperatureUnit, 
  WindSpeedUnit, 
  PrecipitationUnit,
  UnitSystem,
  WeekDay
} from '@/types/WeatherTypes';

export const formatTemperatureFromAPI = (
  tempFromAPI: number,
  unit: TemperatureUnit
): string => {
  // API already returns temperature in the requested unit (imperial/metric)
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${Math.round(tempFromAPI)}${symbol}`;
};

export const formatWindSpeedFromAPI = (
  speedFromAPI: number,
  unit: WindSpeedUnit
): string => {
  // API returns m/s for metric, but we want km/h
  // API returns mph for imperial
  let speed: number;
  let unitLabel: string;

  if (unit === 'kmh') {
    speed = speedFromAPI * 3.6; // Convert m/s to km/h
    unitLabel = 'km/h';
  } else {
    speed = speedFromAPI; // Already in mph for imperial
    unitLabel = 'mph';
  }

  return `${Math.round(speed)} ${unitLabel}`;
};

export const formatPrecipitation = (
  precipMm: number,
  unit: PrecipitationUnit
): string => {
  let precip: number;

  if (unit === 'mm') {
    precip = precipMm;
  } else {
    precip = precipMm * 0.0393701; // mm to inches
  }

  return `${precip.toFixed(1)} ${unit}`;
};

export const getPrecipitationAmount = (weather: any): number => {
  // Get rain amount (1h or 3h)
  const rainAmount = weather.rain?.['1h'] || weather.rain?.['3h'] || 0;
  // Get snow amount (1h or 3h)
  const snowAmount = weather.snow?.['1h'] || weather.snow?.['3h'] || 0;
  // Return total precipitation
  return rainAmount + snowAmount;
};

export const getWeatherIconUrl = (iconCode: string): string => {
  // OpenWeatherMap provides icon codes like "01d", "02n", etc.
  // We return the full URL to the OpenWeatherMap icon
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};


export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
  });
};

export const getImperialUnits = (): UnitSystem => ({
  temperature: 'fahrenheit',
  windSpeed: 'mph',
  precipitation: 'in',
});

export const getMetricUnits = (): UnitSystem => ({
  temperature: 'celsius',
  windSpeed: 'kmh',
  precipitation: 'mm',
});

export const getWeekDays = (): WeekDay[] => [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];