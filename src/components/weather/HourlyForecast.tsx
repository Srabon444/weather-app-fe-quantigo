import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WeatherForecast } from '@/types/WeatherTypes';
import { useWeatherStore } from '@/store/weatherStore';
import { 
  formatTemperatureFromAPI, 
  getWeatherIconUrl,
  formatTime,
  getWeekDays 
} from '@/lib/utils/weatherUtils';
import Image from 'next/image';

interface HourlyForecastProps {
  forecast: WeatherForecast;
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  const { unitSystem, selectedDay, setSelectedDay } = useWeatherStore();
  const weekDays = getWeekDays();
  
  // Filter forecast data by selected day
  const getHourlyDataForDay = () => {
    const today = new Date();
    const selectedDayIndex = weekDays.indexOf(selectedDay);
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + selectedDayIndex);
    
    const targetDateString = targetDate.toISOString().split('T')[0];
    
    // Filter forecast items for the selected date
    const dayData = forecast.list.filter(item => {
      const itemDate = item.dt_txt.split(' ')[0];
      return itemDate === targetDateString;
    });
    
    // If no data for that specific day, show next available data
    return dayData.length > 0 ? dayData : forecast.list.slice(selectedDayIndex * 8, (selectedDayIndex + 1) * 8);
  };
  
  const hourlyData = getHourlyDataForDay().slice(0, 8);

  return (
    <Card className="bg-gray-800/50 border-gray-600 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Hourly forecast</h3>
        
        <Select
          value={selectedDay}
          onValueChange={(value) => setSelectedDay(value as any)}
        >
          <SelectTrigger className="w-[140px] bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {weekDays.map((day) => (
              <SelectItem 
                key={day} 
                value={day}
                className="text-white hover:bg-gray-700"
              >
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {hourlyData.map((hour, index) => {
          const temperature = formatTemperatureFromAPI(
            hour.main.temp,
            unitSystem.temperature
          );
          const weatherIconUrl = getWeatherIconUrl(hour.weather[0].icon);
          const time = formatTime(hour.dt_txt);

          return (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4 flex-1">
                <Image
                  src={weatherIconUrl} 
                  alt={hour.weather[0].description}
                  className="w-10 h-10"
                  width={40}
                  height={40}
                />
                <span className="text-white font-medium">{time}</span>
              </div>
              <span className="text-white font-semibold">{temperature}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};