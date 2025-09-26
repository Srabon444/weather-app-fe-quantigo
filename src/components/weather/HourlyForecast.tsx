/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { WeatherForecast } from '@/types/WeatherTypes';
import { useWeatherStore } from '@/store/weatherStore';
import {
  formatTemperatureFromAPI,
  getWeatherIconUrl,
  formatTime,
  getWeekDays,
} from '@/lib/utils/weatherUtils';
import Image from 'next/image';
import { useState } from 'react';

interface HourlyForecastProps {
  forecast: WeatherForecast;
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  const { unitSystem, selectedDay, setSelectedDay } = useWeatherStore();
  const weekDays = getWeekDays();
  const [isOpen, setIsOpen] = useState(false);

  // Filter forecast data by selected day
  const getHourlyDataForDay = () => {
    const today = new Date();
    const selectedDayIndex = weekDays.indexOf(selectedDay);
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + selectedDayIndex);

    const targetDateString = targetDate.toISOString().split('T')[0];

    // Filtered forecast items for the selected date
    const dayData = forecast.list.filter((item) => {
      const itemDate = item.dt_txt.split(' ')[0];
      return itemDate === targetDateString;
    });

    // If no data for that specific day, showing next available data
    return dayData.length > 0
      ? dayData
      : forecast.list.slice(selectedDayIndex * 8, (selectedDayIndex + 1) * 8);
  };

  const hourlyData = getHourlyDataForDay().slice(0, 8);

  return (
    <Card className="border-none bg-[var(--color-neutral-800)] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Hourly forecast</h3>

        <Select
          value={selectedDay}
          onValueChange={(value) => setSelectedDay(value as any)}
          onOpenChange={setIsOpen}
        >
          <SelectTrigger className="w-fit border-none bg-[var(--color-neutral-600)] text-white">
            <SelectValue />
            <ChevronDown
              className={`h-4 w-4 text-white transition-transform duration-200 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </SelectTrigger>
          <SelectContent className="border-none bg-[var(--color-neutral-600)] p-2">
            {weekDays.map((day) => (
              <SelectItem
                key={day}
                value={day}
                className="mb-1 rounded-md bg-[var(--color-neutral-700)] text-white last:mb-0 focus:bg-[var(--color-neutral-800)]"
              >
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {hourlyData.map((hour, index) => {
          const temperature = formatTemperatureFromAPI(
            hour.main.temp,
            unitSystem.temperature
          );
          const weatherIconUrl = getWeatherIconUrl(hour.weather[0].icon);
          const time = formatTime(hour.dt_txt);

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-none bg-[var(--color-neutral-700)] px-3 py-2.5"
            >
              <div className="flex items-center">
                <Image
                  src={weatherIconUrl}
                  alt={hour.weather[0].description}
                  className="h-10 w-10"
                  width={40}
                  height={40}
                />
                <span className="text-preset-6 font-medium text-white">
                  {time}
                </span>
              </div>
              <span className="text-preset-6 font-medium text-gray-300">
                {temperature}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
