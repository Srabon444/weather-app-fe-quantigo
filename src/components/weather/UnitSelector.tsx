import { useState, useRef, useEffect } from 'react';
import { Settings, ChevronDown, Check } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';
import { getImperialUnits, getMetricUnits } from '@/lib/utils/weatherUtils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="text-preset-7 flex cursor-pointer gap-2 rounded-lg bg-neutral-800 px-3 py-2 text-white transition-colors hover:bg-neutral-800/60 focus:outline-2 focus:outline-offset-[0.1875rem] focus:outline-blue-500"
      >
        <Settings className="h-4 w-4 text-white" />
        Units
        <ChevronDown
          className={`h-4 w-4 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 right-0 z-40 w-72 rounded-lg border border-[var(--color-neutral-600)] bg-[var(--color-neutral-800)] px-2 py-[6px] shadow-lg">
          <Button
            onClick={handleSystemToggle}
            className="text-preset-7 w-full cursor-pointer rounded-lg bg-blue-600 px-2 py-2 text-left text-white hover:bg-blue-700 focus:outline focus:outline-offset-1 focus:outline-blue-500"
          >
            Switch to {isMetric ? 'Imperial' : 'Metric'}
          </Button>

          <div className="mt-2 space-y-2">
            {/* Temperature */}
            <div className="pt-2">
              <Label className="text-preset-8 block px-2 py-1 text-[var(--color-neutral-300)]">
                Temperature
              </Label>
              <div className="space-y-1">
                <UnitButton
                  text="Celsius (°C)"
                  isSelected={unitSystem.temperature === 'celsius'}
                />
                <UnitButton
                  text="Fahrenheit (°F)"
                  isSelected={unitSystem.temperature === 'fahrenheit'}
                />
              </div>
            </div>

            <Separator className="text-[var(--color-neutral-600)]" />

            {/* Wind Speed */}
            <div className="pt-2">
              <Label className="text-preset-8 block px-2 py-1 text-[var(--color-neutral-300)]">
                Wind Speed
              </Label>
              <div className="space-y-1">
                <UnitButton
                  text="km/h"
                  isSelected={unitSystem.windSpeed === 'kmh'}
                />
                <UnitButton
                  text="mph"
                  isSelected={unitSystem.windSpeed === 'mph'}
                />
              </div>
            </div>

            <Separator className="text-[var(--color-neutral-600)]" />

            {/* Precipitation */}
            <div className="pt-2">
              <Label className="text-preset-8 block px-2 py-1 text-[var(--color-neutral-300)]">
                Precipitation
              </Label>
              <div className="space-y-1">
                <UnitButton
                  text="Millimeters (mm)"
                  isSelected={unitSystem.precipitation === 'mm'}
                />
                <UnitButton
                  text="Inches (in)"
                  isSelected={unitSystem.precipitation === 'in'}
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
}

const UnitButton = ({ text, isSelected }: UnitButtonProps) => {
  return (
    <Button
      className={`text-preset-7 flex w-full items-center justify-between rounded-none bg-transparent px-2 py-1 text-left text-white hover:bg-transparent ${
        isSelected
          ? 'rounded-lg bg-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-700)]'
          : 'hover:bg-transparent'
      }`}
    >
      <span>{text}</span>
      {isSelected && <Check className="h-4 w-4" />}
    </Button>
  );
};
