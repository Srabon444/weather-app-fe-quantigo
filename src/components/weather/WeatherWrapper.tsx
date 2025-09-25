'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/shared/Container';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { WeatherDetails } from './WeatherDetails';
import { HourlyForecast } from './HourlyForecast';
import { DailyForecast } from './DailyForecast';
import { WeatherSkeleton, SearchStateSkeleton } from './WeatherSkeleton';
import { WeatherError } from './WeatherError';
import { weatherApi } from '@/lib/api/weatherApi';
import { useWeatherStore } from '@/store/weatherStore';

const WeatherWrapper = () => {
  const { selectedCity, unitSystem } = useWeatherStore();
  const [searchTriggered, setSearchTriggered] = useState(false);

  const units = unitSystem.temperature === 'celsius' ? 'metric' : 'imperial';

  // Auto triggers search if there's a persisted city
  useEffect(() => {
    if (selectedCity && !searchTriggered) {
      setSearchTriggered(true);
    }
  }, [selectedCity, searchTriggered]);

  const {
    data: weatherData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['weather-data', selectedCity, units],
    queryFn: () => weatherApi.getCombinedWeatherData(selectedCity, units),
    enabled: !!selectedCity && searchTriggered,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = (city: string) => {
    setSearchTriggered(true);
  };

  const handleRetry = () => {
    if (selectedCity) {
      refetch();
    }
  };

  const renderContent = () => {
    if (!searchTriggered || !selectedCity) {
      return <SearchStateSkeleton />;
    }

    if (isLoading) {
      return <WeatherSkeleton />;
    }

    if (isError) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      return <WeatherError error={errorMessage} onRetry={handleRetry} />;
    }

    if (!weatherData) {
      return <SearchStateSkeleton />;
    }

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CurrentWeather weather={weatherData.current} />
          <WeatherDetails weather={weatherData.current} />
          <DailyForecast forecast={weatherData.forecast} />
        </div>

        <div className="space-y-6">
          <HourlyForecast forecast={weatherData.forecast} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-purple min-h-screen">
      <Container>
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        {renderContent()}
      </Container>
    </div>
  );
};

export default WeatherWrapper;
