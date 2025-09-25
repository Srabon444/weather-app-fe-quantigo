/* eslint-disable @typescript-eslint/no-explicit-any */
import { WeatherForecast } from '@/types/WeatherTypes';
import { useWeatherStore } from '@/store/weatherStore';
import {
  formatTemperatureFromAPI,
  getWeatherIconUrl,
  formatDate,
} from '@/lib/utils/weatherUtils';
import Image from 'next/image';

interface DailyForecastProps {
  forecast: WeatherForecast;
}

export const DailyForecast = ({ forecast }: DailyForecastProps) => {
  const { unitSystem } = useWeatherStore();

  // Group forecast data by date to get daily forecasts
  const dailyForecasts = forecast.list
    .reduce((acc: any[], item) => {
      const date = item.dt_txt.split(' ')[0];
      const existingDay = acc.find((day) => day.date === date);

      if (existingDay) {
        existingDay.temps.push(item.main.temp);
        existingDay.conditions.push(item.weather[0]);
      } else {
        acc.push({
          date,
          temps: [item.main.temp],
          conditions: [item.weather[0]],
          dt: item.dt,
        });
      }

      return acc;
    }, [])
    .slice(0, 7); // Show 7 days

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-white">Daily Forecast</h2>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
        {dailyForecasts.map((day, index) => {
          const maxTemp = Math.max(...day.temps);
          const minTemp = Math.min(...day.temps);

          const maxTempFormatted = formatTemperatureFromAPI(
            maxTemp,
            unitSystem.temperature
          );

          const minTempFormatted = formatTemperatureFromAPI(
            minTemp,
            unitSystem.temperature
          );

          // Most common weather condition for the day
          const weatherIconUrl = getWeatherIconUrl(day.conditions[0].icon);
          const dayName = index === 0 ? 'Today' : formatDate(day.date);

          return (
            <div
              className="bg-button border-button-border flex flex-col items-center justify-center rounded-xl border p-4"
              key={day.date}
            >
              <h4 className="text-paragraph text-sm font-normal">{dayName}</h4>
              <span className="mt-3">
                <Image
                  src={weatherIconUrl}
                  alt={day.conditions[0].description}
                  className="h-15 w-15"
                  width={60}
                  height={60}
                />
              </span>
              <div className="mt-5 flex w-full items-center justify-between">
                <p className="text-sm font-normal text-white">
                  {maxTempFormatted}
                </p>
                <p className="text-paragraph text-xs font-normal">
                  {minTempFormatted}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
