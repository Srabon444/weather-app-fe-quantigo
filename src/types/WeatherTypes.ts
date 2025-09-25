import { z } from 'zod';

// OpenWeatherMap API response schemas
export const LocationSchema = z.object({
  name: z.string(),
  local_names: z.record(z.string(), z.string()).optional(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

export const CurrentWeatherSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  weather: z.array(z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
  })),
  base: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  visibility: z.number(),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
    gust: z.number().optional(),
  }),
  rain: z.object({
    '1h': z.number().optional(),
    '3h': z.number().optional(),
  }).optional(),
  snow: z.object({
    '1h': z.number().optional(),
    '3h': z.number().optional(),
  }).optional(),
  clouds: z.object({
    all: z.number(),
  }),
  dt: z.number(),
  sys: z.object({
    type: z.number().optional(),
    id: z.number().optional(),
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

export const HourlyForecastSchema = z.object({
  dt: z.number(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
  })),
  clouds: z.object({
    all: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
    gust: z.number().optional(),
  }),
  visibility: z.number(),
  pop: z.number(),
  rain: z.object({
    '3h': z.number(),
  }).optional(),
  snow: z.object({
    '3h': z.number(),
  }).optional(),
  sys: z.object({
    pod: z.string(),
  }),
  dt_txt: z.string(),
});

export const ForecastSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(HourlyForecastSchema),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

// Inferred types
export type Location = z.infer<typeof LocationSchema>;
export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type HourlyForecast = z.infer<typeof HourlyForecastSchema>;
export type WeatherForecast = z.infer<typeof ForecastSchema>;

// Unit types
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'in';

export interface UnitSystem {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
}

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Store types
export interface WeatherStore {
  selectedCity: string;
  unitSystem: UnitSystem;
  selectedDay: WeekDay;
  setSelectedCity: (city: string) => void;
  setUnitSystem: (units: UnitSystem) => void;
  setSelectedDay: (day: WeekDay) => void;
}

// API Error type
export interface WeatherApiError {
  cod: string;
  message: string;
}