/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${Math.round(tempFromAPI)}${symbol}`;
};

export const formatWindSpeedFromAPI = (
  speedFromAPI: number,
  unit: WindSpeedUnit
): string => {
  let speed: number;
  let unitLabel: string;

  if (unit === 'kmh') {
    speed = speedFromAPI * 3.6;
    unitLabel = 'km/h';
  } else {
    speed = speedFromAPI;
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
  const rainAmount = weather.rain?.['1h'] || weather.rain?.['3h'] || 0;
  const snowAmount = weather.snow?.['1h'] || weather.snow?.['3h'] || 0;
  // Return total precipitation
  return rainAmount + snowAmount;
};

export const getWeatherIconUrl = (iconCode: string): string => {
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