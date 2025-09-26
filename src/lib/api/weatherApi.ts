/* eslint-disable @typescript-eslint/no-explicit-any */

import { get } from '@/lib/api/handlers';
import {
  CurrentWeather,
  WeatherForecast,
  CurrentWeatherSchema,
  ForecastSchema,
  WeatherApiError,
  CitySuggestion,
} from '@/types/WeatherTypes';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const weatherApi = {
  // Get city suggestions using Geocoding API
  getCitySuggestions: async (query: string): Promise<CitySuggestion[]> => {
    if (!query.trim() || query.length < 2) return [];
    
    try {
      const response = await get<CitySuggestion[]>(
        `/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${WEATHER_API_KEY}`
      );
      
      return response;
    } catch (error: any) {
      console.error('Failed to fetch city suggestions:', error);
      return [];
    }
  },

  getCurrentWeather: async (
    city: string,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<CurrentWeather> => {
    try {
      const response = await get<CurrentWeather>(
        `/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=${units}`
      );

      return response;
    } catch (error: any) {
      if (error.response?.data) {
        const errorData = error.response.data as WeatherApiError;
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      throw new Error('Network error occurred while fetching weather data');
    }
  },

  getForecast: async (
    city: string,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<WeatherForecast> => {
    try {
      const response = await get<WeatherForecast>(
        `/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=${units}`
      );

      return response;
    } catch (error: any) {
      if (error.response?.data) {
        const errorData = error.response.data as WeatherApiError;
        throw new Error(
          errorData.message || 'Failed to fetch weather forecast'
        );
      }
      throw new Error('Network error occurred while fetching weather forecast');
    }
  },

  getCombinedWeatherData: async (
    city: string,
    units: 'metric' | 'imperial' = 'metric'
  ) => {
    try {
      const [currentWeather, forecast] = await Promise.all([
        weatherApi.getCurrentWeather(city, units),
        weatherApi.getForecast(city, units),
      ]);

      return {
        current: currentWeather,
        forecast: forecast,
      };
    } catch (error: any) {
      throw error;
    }
  },
};
