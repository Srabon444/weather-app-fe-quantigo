import { Card } from '@/components/ui/card';
import { CurrentWeather as CurrentWeatherType } from '@/types/WeatherTypes';
import { useWeatherStore } from '@/store/weatherStore';
import {
  formatTemperatureFromAPI,
  getWeatherIconUrl,
} from '@/lib/utils/weatherUtils';
import Image from 'next/image';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

export const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  const { unitSystem } = useWeatherStore();

  const temperature = formatTemperatureFromAPI(
    weather.main.temp,
    unitSystem.temperature
  );

  const weatherIconUrl = getWeatherIconUrl(weather.weather[0].icon);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="mb-5 border-none bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white md:mb-8">
      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between min-h-[286px]">
        {/*Part 1*/}
        <div className="text-center md:text-left">
          <h2 className="text-preset-4 mb-1 font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-preset-7 mb-4 text-[var(--color-neutral-0)]">
            {today}
          </p>
        </div>

        {/*Part 2*/}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <Image
            src={weatherIconUrl}
            alt={weather.weather[0].description}
            className="h-[120px] w-[120px]"
            width={120}
            height={120}
          />
          <span className="text-preset-1 font-light">{temperature}</span>
        </div>
      </div>
    </Card>
  );
};
