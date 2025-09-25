import { Card } from '@/components/ui/card';
import { CurrentWeather as CurrentWeatherType } from '@/types/WeatherTypes';
import { useWeatherStore } from '@/store/weatherStore';
import { 
  formatTemperatureFromAPI, 
  getWeatherIconUrl 
} from '@/lib/utils/weatherUtils';

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
    <Card className="bg-gradient-to-br from-blue-600 to-purple-700 border-none text-white p-8 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-blue-100 mb-4">{today}</p>
          
          <div className="flex items-center gap-4">
            <img 
              src={weatherIconUrl} 
              alt={weather.weather[0].description}
              className="w-16 h-16"
            />
            <span className="text-6xl font-light">{temperature}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};