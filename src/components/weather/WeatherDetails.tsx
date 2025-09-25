import { Card } from '@/components/ui/card';
import { CurrentWeather } from '@/types/WeatherTypes';
import { useWeatherStore } from '@/store/weatherStore';
import { 
  formatTemperatureFromAPI, 
  formatWindSpeedFromAPI, 
  formatPrecipitation,
  getPrecipitationAmount
} from '@/lib/utils/weatherUtils';

interface WeatherDetailsProps {
  weather: CurrentWeather;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const { unitSystem } = useWeatherStore();
  
  const feelsLike = formatTemperatureFromAPI(
    weather.main.feels_like,
    unitSystem.temperature
  );

  const windSpeed = formatWindSpeedFromAPI(
    weather.wind.speed,
    unitSystem.windSpeed
  );

  // Can't seem to find precipitation data from API TODO: Verify with different locations and weather conditions
  const precipitationAmount = getPrecipitationAmount(weather);
  const precipitation = formatPrecipitation(precipitationAmount, unitSystem.precipitation);

  const details = [
    {
      label: 'Feels Like',
      value: feelsLike,
    },
    {
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
    },
    {
      label: 'Wind',
      value: windSpeed,
    },
    {
      label: 'Precipitation',
      value: precipitation,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {details.map((detail) => (
        <Card key={detail.label} className="bg-gray-800/50 border-gray-600 p-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">{detail.label}</p>
            <p className="text-white text-xl font-semibold">{detail.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};