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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-8">
      {details.map((detail) => (
        <Card key={detail.label} className="bg-[var(--color-neutral-600)] border-[var(--color-neutral-800)] p-4">
          <div className="text-start">
            <p className="text-[var(--color-neutral-200)] text-preset-7 mb-6">{detail.label}</p>
            <p className="text-[var(--color-neutral-0)] font-light text-preset-3">{detail.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};