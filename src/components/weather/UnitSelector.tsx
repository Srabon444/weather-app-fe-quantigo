import { useState, useRef, useEffect } from 'react';
import { Settings, ChevronDown, Check } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';
import { getImperialUnits, getMetricUnits } from '@/lib/utils/weatherUtils';

export const UnitSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { unitSystem, setUnitSystem } = useWeatherStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isMetric = unitSystem.temperature === 'celsius';

  const handleSystemToggle = () => {
    setUnitSystem(isMetric ? getImperialUnits() : getMetricUnits());
    setIsOpen(false);
  };

  const handleUnitChange = (
    unitType: 'temperature' | 'windSpeed' | 'precipitation',
    value: string
  ) => {
    // Auto-switch to the appropriate system based on selection
    if (unitType === 'temperature') {
      setUnitSystem(
        value === 'celsius' ? getMetricUnits() : getImperialUnits()
      );
    } else if (unitType === 'windSpeed') {
      setUnitSystem(value === 'kmh' ? getMetricUnits() : getImperialUnits());
    } else if (unitType === 'precipitation') {
      setUnitSystem(value === 'mm' ? getMetricUnits() : getImperialUnits());
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer gap-2 rounded-lg bg-gray-800/60 px-3 py-2 text-white transition-colors hover:bg-gray-700/60 focus:outline-2 focus:outline-offset-[0.1875rem] focus:outline-blue-500"
      >
        <Settings className="h-4 w-4" />
        Units
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 right-0 z-40 w-72 rounded-lg border border-gray-600 bg-gray-800 p-2 shadow-lg">
          <button
            onClick={handleSystemToggle}
            className="w-full cursor-pointer rounded-lg px-2 py-2 text-left text-white hover:bg-gray-700 focus:outline focus:outline-offset-1 focus:outline-blue-500"
          >
            Switch to {isMetric ? 'Imperial' : 'Metric'}
          </button>

          <div className="mt-2 space-y-3 divide-y divide-gray-600">
            {/* Temperature */}
            <div className="pt-2">
              <label className="block px-2 py-1 text-sm text-gray-300">
                Temperature
              </label>
              <div className="space-y-1">
                <UnitButton
                  text="Celsius (°C)"
                  isSelected={unitSystem.temperature === 'celsius'}
                  onClick={() => handleUnitChange('temperature', 'celsius')}
                />
                <UnitButton
                  text="Fahrenheit (°F)"
                  isSelected={unitSystem.temperature === 'fahrenheit'}
                  onClick={() => handleUnitChange('temperature', 'fahrenheit')}
                />
              </div>
            </div>

            {/* Wind Speed */}
            <div className="pt-2">
              <label className="block px-2 py-1 text-sm text-gray-300">
                Wind Speed
              </label>
              <div className="space-y-1">
                <UnitButton
                  text="km/h"
                  isSelected={unitSystem.windSpeed === 'kmh'}
                  onClick={() => handleUnitChange('windSpeed', 'kmh')}
                />
                <UnitButton
                  text="mph"
                  isSelected={unitSystem.windSpeed === 'mph'}
                  onClick={() => handleUnitChange('windSpeed', 'mph')}
                />
              </div>
            </div>

            {/* Precipitation */}
            <div className="pt-2">
              <label className="block px-2 py-1 text-sm text-gray-300">
                Precipitation
              </label>
              <div className="space-y-1">
                <UnitButton
                  text="Millimeters (mm)"
                  isSelected={unitSystem.precipitation === 'mm'}
                  onClick={() => handleUnitChange('precipitation', 'mm')}
                />
                <UnitButton
                  text="Inches (in)"
                  isSelected={unitSystem.precipitation === 'in'}
                  onClick={() => handleUnitChange('precipitation', 'in')}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface UnitButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const UnitButton = ({ text, isSelected, onClick }: UnitButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-white transition-colors focus:outline focus:outline-offset-1 focus:outline-blue-500 ${
        isSelected ? 'bg-gray-700' : 'hover:bg-gray-700'
      }`}
    >
      <span>{text}</span>
      {isSelected && <Check className="h-4 w-4" />}
    </button>
  );
};
