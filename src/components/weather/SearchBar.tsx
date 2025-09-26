import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';
import { weatherApi } from '@/lib/api/weatherApi';
import { CitySuggestion } from '@/types/WeatherTypes';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setSelectedCity } = useWeatherStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = async (value: string) => {
    setSearchInput(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.trim().length >= 2) {
      // Debounce API call
      timeoutRef.current = setTimeout(async () => {
        try {
          const results = await weatherApi.getCitySuggestions(value.trim());
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
          setSuggestions([]);
        }
      }, 200);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      performSearch(searchInput.trim());
    }
  };

  const performSearch = (cityName: string) => {
    setSelectedCity(cityName);
    onSearch(cityName);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    const cityName = `${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ''}, ${suggestion.country}`;
    setSearchInput(cityName);
    performSearch(cityName);
  };

  return (
    <div className="mx-auto mb-8 w-full md:mb-12">
      <h2 className="text-preset-2 mb-12 text-center font-bold text-white lg:mb-16">
        How&apos;s the sky looking today?
      </h2>

      <form onSubmit={handleSubmit} className="relative mx-auto max-w-[656px]">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-6 z-10 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="city-search"
              type="text"
              placeholder="Search for a place..."
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="text-preset-5 h-14 border-none bg-[var(--color-neutral-800)] pl-[60px] text-white placeholder:text-gray-400 focus:border-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-0"
              disabled={isLoading}
              autoComplete="off"
            />

            {/* Suggestions Dropdown */}

            {showSuggestions && suggestions.length > 0 && (
              <div className="bg-[var(--color-neutral-700)] absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-none shadow-lg">
                {suggestions.map((suggestion) => (
                  <div
                    key={`${suggestion.lat}-${suggestion.lon}-${suggestion.name}`}
                    className="flex cursor-pointer items-center gap-3 border-b border-gray-700 px-4 py-3 text-gray-300 last:border-b-0 hover:bg-[var(--color-neutral-800)]"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="font-medium">
                        {suggestion.name}
                        {suggestion.state && (
                          <span className="text-gray-400">
                            , {suggestion.state}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={!searchInput.trim() || isLoading}
            className="text-preset-5 h-14 cursor-pointer bg-blue-600 px-6 text-xl text-white hover:bg-blue-700 hover:ring-2 hover:ring-blue-600 hover:ring-offset-1 hover:ring-offset-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 focus:ring-offset-transparent md:w-1400"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};
