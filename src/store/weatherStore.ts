import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherStore, UnitSystem, WeekDay } from '@/types/WeatherTypes';

const initialUnitSystem: UnitSystem = {
  temperature: 'celsius',
  windSpeed: 'kmh',
  precipitation: 'mm',
};

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      selectedCity: '',
      unitSystem: initialUnitSystem,
      selectedDay: 'Tuesday',
      setSelectedCity: (city: string) => set({ selectedCity: city }),
      setUnitSystem: (units: UnitSystem) => set({ unitSystem: units }),
      setSelectedDay: (day: WeekDay) => set({ selectedDay: day }),
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({
        selectedCity: state.selectedCity,
        unitSystem: state.unitSystem,
        selectedDay: state.selectedDay,
      }),
    }
  )
);