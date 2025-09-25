import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('');
  const { setSelectedCity } = useWeatherStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSelectedCity(searchInput.trim());
      onSearch(searchInput.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
        How&apos;s the sky looking today?
      </h2>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for a place..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={!searchInput.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Search
        </Button>
      </form>
    </div>
  );
};